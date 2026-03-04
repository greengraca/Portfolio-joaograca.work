import { useMemo } from "react"
import { useI18n } from "../i18n/I18nProvider"
import githubProjects from "../data/github-projects.json"

export default function useGithubProjects() {
  const { lang } = useI18n()

  return useMemo(() => {
    const pt = lang === "pt"
    return githubProjects.map((p) => ({
      ...p,
      title: (pt && p.titlePT) || p.title || p.id,
      subtitle: (pt && p.subtitlePT) || p.subtitle || "",
      description: (pt && p.descriptionPT) || p.description || "",
      details: (pt && p.detailsPT) || p.details || [],
      tech: p.tech || [],
      links: (p.links || []).map((l) => ({
        ...l,
        label: l.label || l.id,
      })),
    }))
  }, [lang])
}
