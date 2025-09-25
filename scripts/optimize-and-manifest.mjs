import fs from "fs"
import path from "path"
import sharp from "sharp"

const SRC = "src/images_raw"
const OUT = "public/images/projects"           // optimized output
const MANIFEST_OUT = "src/data/projects.manifest.json"
const SIZES = [400, 800, 1200]
const INPUT_EXTS = new Set([".png", ".jpg", ".jpeg"])
const CLEAN = process.argv.includes("--clean")

const ensureDir = (p) => fs.mkdirSync(p, { recursive: true })

async function buildVariants(buf, outDir, baseName) {
  for (const w of SIZES) {
    await sharp(buf).resize({ width: w }).webp({ quality: 78 })
      .toFile(path.join(outDir, `${baseName}-${w}.webp`))
    await sharp(buf).resize({ width: w }).avif({ quality: 50 })
      .toFile(path.join(outDir, `${baseName}-${w}.avif`))
  }
}

function readDirSorted(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
}

function rmrf(p) {
  if (!fs.existsSync(p)) return
  for (const entry of fs.readdirSync(p, { withFileTypes: true })) {
    const full = path.join(p, entry.name)
    entry.isDirectory() ? rmrf(full) : fs.unlinkSync(full)
  }
  fs.rmdirSync(p)
}

async function processProject(projectId) {
  const srcDir = path.join(SRC, projectId)
  const outDir = path.join(OUT, projectId)
  ensureDir(outDir)

  const files = readDirSorted(srcDir)
    .filter(d => d.isFile() && INPUT_EXTS.has(path.extname(d.name).toLowerCase()))

  if (files.length === 0) return null

  // per-project clean of stale generated files
  if (CLEAN) {
    const keepBases = new Set(files.map(src => path.basename(src.name, path.extname(src.name))))
    for (const f of fs.readdirSync(outDir)) {
      // file format: <base>-<size>.<ext>
      const base = f.split("-")[0]
      if (!keepBases.has(base)) {
        fs.unlinkSync(path.join(outDir, f))
        console.log(`🗑️  Removed stale: ${projectId}/${f}`)
      }
    }
  }

  // cover: explicit "cover.*" else first file
  const coverEntry = files.find(f => /^cover\./i.test(f.name)) ?? files[0]

  // generate all variants
  for (const f of files) {
    const abs = path.join(srcDir, f.name)
    const baseName = path.basename(f.name, path.extname(f.name))
    const buf = fs.readFileSync(abs)
    await buildVariants(buf, outDir, baseName)
  }

  const base = (name) => `/images/projects/${projectId}/${name}`

  const images = files
    .filter(f => f !== coverEntry)
    .map(f => base(path.basename(f.name, path.extname(f.name))))

  return {
    id: projectId,
    cover: base(path.basename(coverEntry.name, path.extname(coverEntry.name))),
    images
  }
}

async function run() {
  ensureDir(OUT)

  const srcDirs = readDirSorted(SRC).filter(d => d.isDirectory()).map(d => d.name)

  // global clean: remove OUT subfolders with no matching SRC
  if (CLEAN && fs.existsSync(OUT)) {
    for (const outEntry of fs.readdirSync(OUT, { withFileTypes: true })) {
      if (!outEntry.isDirectory()) continue
      const projectId = outEntry.name
      if (!srcDirs.includes(projectId)) {
        rmrf(path.join(OUT, projectId))
        console.log(`🗑️  Removed orphaned project folder: ${projectId}`)
      }
    }
  }

  const manifest = {}
  for (const id of srcDirs) {
    const entry = await processProject(id)
    if (entry) manifest[id] = entry
  }

  ensureDir(path.dirname(MANIFEST_OUT))
  fs.writeFileSync(MANIFEST_OUT, JSON.stringify(manifest, null, 2))
  console.log(`✅ Wrote ${MANIFEST_OUT}`)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})