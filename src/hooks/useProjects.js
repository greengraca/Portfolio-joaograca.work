import { useMemo } from "react"
import projectsBase from "../data/projects"
import { useI18n } from "../i18n/I18nProvider"

export default function useProjects() {
  const { lang, t } = useI18n()

  return useMemo(() => {
    return projectsBase.map((p) => {
      const tr = t(`projects.${p.id}`) || {}
      const linkLabels = tr.links || {}

      return {
        ...p,
        title: tr.title ?? p.title ?? p.id,
        subtitle: tr.subtitle ?? p.subtitle ?? "",
        description: tr.description ?? p.description ?? "",
        details: tr.details ?? p.details ?? [],
        links: (p.links || []).map(l => ({
          ...l,
          label: linkLabels[l.id] ?? l.label ?? l.id
        }))
      }
    })
  }, [lang, t])
}
