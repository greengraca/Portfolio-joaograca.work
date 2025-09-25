import base from "./projects.base"
import manifest from "./projects.manifest.json"

// Merge helper: fill cover/images from manifest by id
const projects = base.map(p => {
  const m = manifest[p.id] || {}
  return {
    ...p,
    cover: m.cover ?? p.cover ?? null,
    images: m.images ?? p.images ?? []
  }
})

export default projects
