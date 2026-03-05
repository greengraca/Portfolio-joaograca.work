import { useState } from "react"
import useGithubProjects from "../hooks/useGithubProjects"
import ProjectCard from "./ProjectCard"
import ProjectModal from "./ProjectModal"
import AnimatedText from "./AnimatedText"
import { useI18n } from "../i18n/I18nProvider"
import { usePersonality } from "../contexts/PersonalityContext"

export default function GithubProjectList() {
  const { t } = useI18n()
  const { personality } = usePersonality()
  const projects = useGithubProjects()
  const [selected, setSelected] = useState(null)

  if (projects.length === 0) return null

  return (
    <section className="px-6 pt-4 pb-20 max-w-[1100px] mx-auto">
      <AnimatedText>
        <div className="mb-10">
          <h2 className="font-display text-[clamp(22px,3.5vw,32px)] font-normal mb-3 italic" style={{ color: "var(--text-primary)" }}>
            {personality ? t("sections.moreProjectsPersonality") : t("sections.moreProjects")}
          </h2>
          <p className="font-body text-[14px] max-w-[600px] leading-[1.6]" style={{ color: "var(--text-muted)" }}>
            {personality ? t("sections.moreProjectsParagraphPersonality") : t("sections.moreProjectsParagraph")}
          </p>
        </div>
      </AnimatedText>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} isFullWidth={false} onClick={() => setSelected(p)} />
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
