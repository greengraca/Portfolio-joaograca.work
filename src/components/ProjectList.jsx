import { useState, useMemo } from "react"
import useProjects from "../hooks/useProjects"
import ProjectCard from "./ProjectCard"
import useReveal from "../hooks/useReveal"
import { useI18n } from "../i18n/I18nProvider";

export default function ProjectList() {
  useReveal()
  const { t } = useI18n()
  const projects = useProjects()              // ← use the translated list
  const [openId, setOpenId] = useState(null)
  const openIndex = useMemo(
    () => projects.findIndex(p => p.id === openId),
    [openId, projects]
  )

  return (
    <section id="projects" className="mb-14 md:mb-20">
      <h3 className="text-2xl md:text-3xl font-semibold mb-8 md:mb-8">
        {t("sections.projects")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((p, index) => {
          const isExpanded = openId === p.id
          const isLeftOfExpanded =
            openIndex !== -1 && openIndex % 2 === 1 && index === openIndex - 1
          const colSpan = isExpanded || isLeftOfExpanded ? "md:col-span-2" : ""

          return (
            <div key={p.id} className={`${colSpan} js-reveal`}>
              <ProjectCard
                project={p}
                expanded={isExpanded}
                onToggle={() => setOpenId(cur => (cur === p.id ? null : p.id))}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
