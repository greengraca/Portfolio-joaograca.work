import { readFileSync, writeFileSync, existsSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = join(__dirname, "..", "src", "data", "github-projects.json")
const PROJECTS_BASE_PATH = join(__dirname, "..", "src", "data", "projects.base.js")

const GITHUB_USER = "greengraca"
const TOPIC_TAG = "portfolio"

// Language → color mapping for repos without .portfolio.json
const LANGUAGE_COLORS = {
  JavaScript: { color: "#F59E0B", accentDark: "#FBBF24" },
  TypeScript: { color: "#3178C6", accentDark: "#60A5FA" },
  Python: { color: "#8B5CF6", accentDark: "#A78BFA" },
  Java: { color: "#E76F00", accentDark: "#FB923C" },
  "C#": { color: "#68217A", accentDark: "#A78BFA" },
  Go: { color: "#00ADD8", accentDark: "#22D3EE" },
  Rust: { color: "#CE422B", accentDark: "#F87171" },
  Ruby: { color: "#CC342D", accentDark: "#F87171" },
  PHP: { color: "#777BB4", accentDark: "#A78BFA" },
  HTML: { color: "#E34C26", accentDark: "#FB923C" },
  CSS: { color: "#563D7C", accentDark: "#A78BFA" },
  Shell: { color: "#89E051", accentDark: "#86EFAC" },
}
const DEFAULT_COLORS = { color: "#64748B", accentDark: "#94A3B8" }

// Topics to exclude from tech tags (not useful as tech labels)
const EXCLUDED_TOPICS = new Set([TOPIC_TAG, "portfolio", "project", "personal"])

// Image extensions to look for in .portfolio/ directory
const IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "webp", "avif", "gif", "svg"])

function humanize(repoName) {
  return repoName
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function deriveYear(createdAt, pushedAt) {
  const created = new Date(createdAt).getFullYear()
  const pushed = new Date(pushedAt).getFullYear()
  return created === pushed ? String(created) : `${created}\u2013${pushed}`
}

function extractExistingGithubUrls() {
  try {
    const content = readFileSync(PROJECTS_BASE_PATH, "utf-8")
    const urls = []
    const regex = /https:\/\/github\.com\/[^\s'"`,)]+/g
    let match
    while ((match = regex.exec(content)) !== null) {
      urls.push(match[0].replace(/\/+$/, ""))
    }
    return new Set(urls)
  } catch {
    return new Set()
  }
}

async function fetchJSON(url) {
  const headers = { "User-Agent": "joaograca-portfolio-builder" }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  const res = await fetch(url, { headers })
  if (!res.ok) return null
  return res.json()
}

async function fetchPortfolioJson(repo) {
  const url = `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/.portfolio.json`
  try {
    return await fetchJSON(url)
  } catch {
    return null
  }
}

async function fetchPortfolioImages(repo) {
  // List files in .portfolio/ directory via GitHub API
  const url = `https://api.github.com/repos/${repo.full_name}/contents/.portfolio`
  const files = await fetchJSON(url)
  if (!files || !Array.isArray(files)) return { cover: null, images: [] }

  const rawBase = `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/.portfolio`

  let cover = null
  const images = []

  for (const file of files) {
    if (file.type !== "file") continue
    const ext = file.name.split(".").pop()?.toLowerCase()
    if (!IMAGE_EXTENSIONS.has(ext)) continue

    const rawUrl = `${rawBase}/${file.name}`
    const nameLower = file.name.toLowerCase()

    if (nameLower.startsWith("cover")) {
      cover = rawUrl
    } else {
      images.push({ name: file.name, url: rawUrl })
    }
  }

  // Sort images by filename for consistent ordering
  images.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))

  return { cover, images: images.map((i) => i.url) }
}

async function main() {
  console.log(`Fetching GitHub repos for user "${GITHUB_USER}"...`)

  const repos = await fetchJSON(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`
  )

  if (!repos || !Array.isArray(repos)) {
    console.warn("Failed to fetch repos from GitHub API. Preserving existing file.")
    return
  }

  const portfolioRepos = repos.filter(
    (r) => r.topics && r.topics.includes(TOPIC_TAG) && !r.fork
  )

  console.log(`Found ${portfolioRepos.length} repo(s) with "${TOPIC_TAG}" topic.`)

  const existingUrls = extractExistingGithubUrls()

  const filtered = portfolioRepos.filter((r) => {
    const url = r.html_url.replace(/\/+$/, "")
    if (existingUrls.has(url)) {
      console.log(`  Skipping "${r.name}" (already in projects.base.js)`)
      return false
    }
    return true
  })

  console.log(`${filtered.length} new repo(s) to process.`)

  const projects = []

  for (const repo of filtered) {
    const meta = await fetchPortfolioJson(repo)

    const langColors = LANGUAGE_COLORS[repo.language] || DEFAULT_COLORS

    // Build tech array
    let tech
    if (meta?.tech && Array.isArray(meta.tech)) {
      tech = meta.tech
    } else {
      tech = []
      if (repo.language) tech.push(repo.language)
      for (const topic of repo.topics || []) {
        if (!EXCLUDED_TOPICS.has(topic) && topic !== repo.language?.toLowerCase()) {
          tech.push(topic.charAt(0).toUpperCase() + topic.slice(1))
        }
      }
      if (tech.length === 0) tech = ["Code"]
    }

    // Build links
    const links = [{ id: "github", href: repo.html_url, label: "Github" }]
    if (repo.homepage) {
      links.push({ id: "live", href: repo.homepage, label: "Live" })
    }

    // Fetch images from .portfolio/ directory
    console.log(`  Fetching images for "${repo.name}"...`)
    const repoImages = await fetchPortfolioImages(repo)
    if (repoImages.cover) console.log(`    Cover: ${repoImages.cover}`)
    if (repoImages.images.length > 0) console.log(`    ${repoImages.images.length} additional image(s)`)
    if (!repoImages.cover && repoImages.images.length === 0) console.log(`    No images found in .portfolio/`)

    const project = {
      id: repo.name,
      title: meta?.title || humanize(repo.name),
      subtitle: meta?.subtitle || repo.description || "",
      description: meta?.description || repo.description || "",
      details: meta?.details || [],
      year: meta?.year || deriveYear(repo.created_at, repo.pushed_at),
      tech,
      color: meta?.color || langColors.color,
      accentDark: meta?.accentDark || langColors.accentDark,
      icon: meta?.icon || null,
      cover: repoImages.cover,
      images: repoImages.images,
      links,
      source: "github",
      _order: meta?.order ?? 999,
      _pushedAt: repo.pushed_at,
    }

    // Pass through optional Portuguese translation fields
    if (meta?.titlePT) project.titlePT = meta.titlePT
    if (meta?.subtitlePT) project.subtitlePT = meta.subtitlePT
    if (meta?.descriptionPT) project.descriptionPT = meta.descriptionPT
    if (meta?.detailsPT) project.detailsPT = meta.detailsPT

    projects.push(project)
  }

  // Sort: by .portfolio.json order first, then by pushed_at descending
  projects.sort((a, b) => {
    if (a._order !== b._order) return a._order - b._order
    return new Date(b._pushedAt) - new Date(a._pushedAt)
  })

  // Remove internal sort fields
  const output = projects.map(({ _order, _pushedAt, ...rest }) => rest)

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n")
  console.log(`Wrote ${output.length} project(s) to src/data/github-projects.json`)
}

main().catch((err) => {
  console.error("GitHub fetch failed:", err.message)
  if (existsSync(OUTPUT_PATH)) {
    console.log("Preserving existing github-projects.json")
  }
  process.exit(0) // Don't fail the build
})
