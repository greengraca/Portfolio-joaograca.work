import { useState, useMemo } from "react"
import useProjects from "../hooks/useProjects"
import ProjectCard from "./ProjectCard"
import ProjectModal from "./ProjectModal"
import AnimatedText from "./AnimatedText"
import { useI18n } from "../i18n/I18nProvider"
import { usePersonality } from "../contexts/PersonalityContext"

export default function ProjectList() {
  const { t } = useI18n()
  const { personality } = usePersonality()
  const projects = useProjects()
  const [selected, setSelected] = useState(null)

  const fullWidthSet = useMemo(() => {
    const wideSet = new Set([0, 3])
    let col = 0
    for (let i = 0; i < projects.length; i++) {
      const span = wideSet.has(i) ? 2 : 1
      if (col + span > 2) col = 0
      if (i === projects.length - 1 && col === 0 && span === 1) {
        wideSet.add(i)
      }
      col += span
      if (col >= 2) col = 0
    }
    return wideSet
  }, [projects.length])

  return (
    <section id="projects" className="px-6 pt-10 pb-20 max-w-[1100px] mx-auto">
      <AnimatedText>
        <div className="mb-12">
          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-normal mb-3 italic" style={{ color: "var(--text-primary)" }}>
            {personality ? t("sections.projectsPersonality") : t("sections.projects")}
          </h2>
          <p className="font-body text-[15px] max-w-[600px] leading-[1.6]" style={{ color: "var(--text-muted)" }}>
            {personality ? t("sections.projectsParagraphPersonality") : t("sections.projectsParagraph")}
          </p>
        </div>
      </AnimatedText>

      <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} isFullWidth={fullWidthSet.has(i)} onClick={() => setSelected(p)} />
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
