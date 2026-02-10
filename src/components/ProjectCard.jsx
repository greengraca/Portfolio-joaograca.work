import { useState } from "react"
import useScrollReveal from "../hooks/useScrollReveal"
import { usePersonality } from "../contexts/PersonalityContext"

export default function ProjectCard({ project, onClick, index, isFullWidth }) {
  const [ref, vis] = useScrollReveal()
  const [hovered, setHovered] = useState(false)
  const { personality } = usePersonality()

  const coverSrc = project.cover
    ? `${project.cover}-800.webp`
    : project.images?.[0]
      ? `${project.images[0]}-800.webp`
      : "/images/placeholder.png"

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="project-card cursor-pointer relative overflow-hidden rounded-[20px] flex flex-col"
      style={{
        gridColumn: isFullWidth ? "span 2" : "span 1",
        border: "1px solid var(--card-border)",
        background: "var(--card-inner-bg)",
        boxShadow: "var(--card-shadow)",
        transform: vis ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(30px)",
        opacity: vis ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${index * 0.08}s`,
        minHeight: isFullWidth ? 320 : 380,
      }}
    >
      {/* Image area */}
      <div className="project-card-img-wrap" style={{ background: `linear-gradient(135deg, ${project.color}15, ${project.color}08)` }}>
        <img
          src={coverSrc}
          alt={project.title}
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          loading="lazy"
          onError={(e) => { e.target.style.display = "none" }}
        />
        {/* Gradient fades to card-inner-bg, bleeds 2px below to prevent any seam */}
        <div className="project-card-img-overlay"
          style={{ background: "linear-gradient(to top, var(--card-inner-bg) 2px, transparent 100%)" }} />

        {/* Year badge */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-[10px] border border-white/10 text-[11px] font-semibold font-mono z-10"
          style={{ color: "#94a3b8" }}>
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pb-6 flex-1 flex flex-col relative">
        <div className="flex items-start gap-2">
          {personality && <span className="text-lg mt-0.5 shrink-0">{project.icon}</span>}
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-[22px] font-normal mb-1 leading-tight" style={{ color: "var(--text-primary)" }}>
              {project.title}
            </h3>
            <p className="text-xs font-semibold font-mono mb-3" style={{ color: project.accentDark }}>
              {project.subtitle}
            </p>
          </div>
        </div>
        <p className="font-body text-sm leading-[1.6] flex-1 line-clamp-3" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {project.tech.map(t => (
            <span key={t} className="tech-tag text-[11px] px-2 py-[3px] rounded-md font-mono">{t}</span>
          ))}
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all duration-300 z-10"
        style={{
          background: hovered ? (personality ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.08)") : "transparent",
          color: hovered ? (personality ? "#fbbf24" : "#e2e8f0") : "#475569",
          transform: hovered ? "translate(0,0)" : "translate(4px, 4px)",
          opacity: hovered ? 1 : 0,
        }}>→</div>
    </div>
  )
}
