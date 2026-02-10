import { useState } from "react"
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

  return (
    <section id="projects" className="px-6 pt-10 pb-20 max-w-[1100px] mx-auto">
      <AnimatedText>
        <div className="mb-12">
          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-normal text-gray-100 mb-3 italic">
            {personality ? t("sections.projectsPersonality") : t("sections.projects")}
          </h2>
          <p className="font-body text-[15px] text-gray-500 max-w-[480px] leading-[1.6]">
            {personality ? t("sections.projectsParagraphPersonality") : t("sections.projectsParagraph")}
          </p>
        </div>
      </AnimatedText>

      <div
        className="projects-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
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
