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

  // Calculate which projects should be full width
  // Default wide indices: 0 and 3
  // Also force last project to full width if it would be alone on a row
  const fullWidthSet = useMemo(() => {
    const wideSet = new Set([0, 3])

    // Simulate grid to check if last item ends up alone
    let col = 0
    for (let i = 0; i < projects.length; i++) {
      const span = wideSet.has(i) ? 2 : 1
      if (col + span > 2) { col = 0 } // new row
      col += span
      if (col >= 2) col = 0
    }

    // If after placing all items, the last item started on col 0 and was span 1,
    // it's alone on its row → make it full width
    let colCheck = 0
    let lastItemCol = 0
    for (let i = 0; i < projects.length; i++) {
      const span = wideSet.has(i) ? 2 : 1
      if (colCheck + span > 2) colCheck = 0
      if (i === projects.length - 1) {
        lastItemCol = colCheck
        if (colCheck === 0 && span === 1) {
          wideSet.add(i)
        }
      }
      colCheck += span
      if (colCheck >= 2) colCheck = 0
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
          <p className="font-body text-[15px] max-w-[480px] leading-[1.6]" style={{ color: "var(--text-muted)" }}>
            {personality ? t("sections.projectsParagraphPersonality") : t("sections.projectsParagraph")}
          </p>
        </div>
      </AnimatedText>

      <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            isFullWidth={fullWidthSet.has(i)}
            onClick={() => setSelected(p)}
          />
        ))}
      </div>

      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}
