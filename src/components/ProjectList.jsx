import { useState, useMemo } from "react"
import projects from "../data/projects"
import ProjectCard from "./ProjectCard"
import useReveal from "../hooks/useReveal"

export default function ProjectList() {
  useReveal() 

  const [openId, setOpenId] = useState(null)
  const openIndex = useMemo(
    () => projects.findIndex(p => p.id === openId),
    [openId]
  )

  return (
    <section id="projects" className="mb-14 md:mb-20">
      <h3 className="text-2xl md:text-3xl font-semibold mb-8 md:mb-8">Highlighted projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projects.map((p, index) => {
          const isExpanded = openId === p.id
          //   const isRightCol = index % 2 === 1
          const isLeftOfExpanded =
            openIndex !== -1 && openIndex % 2 === 1 && index === openIndex - 1

          const colSpan =
            isExpanded || isLeftOfExpanded ? "md:col-span-2" : ""

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
