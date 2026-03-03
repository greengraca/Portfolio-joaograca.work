import { useMemo } from "react"
import githubProjects from "../data/github-projects.json"

export default function useGithubProjects() {
  return useMemo(() => {
    return githubProjects.map((p) => ({
      ...p,
      title: p.title || p.id,
      subtitle: p.subtitle || "",
      description: p.description || "",
      details: p.details || [],
      tech: p.tech || [],
      links: (p.links || []).map((l) => ({
        ...l,
        label: l.label || l.id,
      })),
    }))
  }, [])
}
