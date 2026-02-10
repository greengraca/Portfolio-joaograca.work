import { useState } from "react"
import useScrollReveal from "../hooks/useScrollReveal"
import { usePersonality } from "../contexts/PersonalityContext"

export default function ProjectCard({ project, onClick, index, isFullWidth }) {
  const [ref, vis] = useScrollReveal()
  const [hovered, setHovered] = useState(false)
  const { personality } = usePersonality()

  const isWide = isFullWidth
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
      className={`project-card cursor-pointer relative overflow-hidden rounded-[20px] flex flex-col transition-all duration-500 ${personality && hovered ? "personality-card-hover" : ""}`}
      style={{
        gridColumn: isWide ? "span 2" : "span 1",
        border: `1px solid ${hovered ? (personality ? "rgba(245,158,11,0.35)" : "rgba(255,255,255,0.12)") : "rgba(255,255,255,0.06)"}`,
        background: hovered ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
        transform: vis ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(30px)",
        opacity: vis ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
        minHeight: isWide ? 320 : 380,
      }}
    >
      {/* Personality border glow */}
      {personality && (
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-500 z-10"
          style={{
            opacity: hovered ? 1 : 0,
            background: "transparent",
            boxShadow: "inset 0 0 0 1px rgba(245,158,11,0.3), 0 0 20px rgba(245,158,11,0.08)",
          }}
        />
      )}

      {/* Cover image - overflow hidden on wrapper to prevent gap */}
      <div
        className="relative w-full overflow-hidden shrink-0"
        style={{
          height: 200,
          background: `linear-gradient(135deg, ${project.color}15, ${project.color}08)`,
        }}
      >
        <img
          src={coverSrc}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-600"
          style={{
            transform: hovered ? "scale(1.05)" : "scale(1)",
            display: "block", /* removes inline gap */
          }}
          loading="lazy"
          onError={(e) => { e.target.style.display = "none" }}
        />
        {/* Gradient overlay - extends 1px into content area to eliminate seam */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(10,15,20,0.95) 0%, rgba(10,15,20,0.2) 40%, transparent 100%)",
            bottom: -1,
          }}
        />

        {/* Year badge */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-[10px] border border-white/10 text-[11px] font-semibold font-mono" style={{ color: "var(--text-muted)" }}>
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pb-6 flex-1 flex flex-col relative" style={{ marginTop: -1 }}>
        <div className="flex items-start gap-2">
          {/* Personality emoji next to title */}
          {personality && (
            <span className="text-lg mt-0.5 shrink-0">{project.icon}</span>
          )}
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

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {project.tech.map(t => (
            <span key={t} className="tech-tag text-[11px] px-2 py-[3px] rounded-md font-mono">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Hover arrow */}
      <div
        className="absolute bottom-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all duration-300"
        style={{
          background: hovered ? (personality ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.08)") : "transparent",
          color: hovered ? (personality ? "#fbbf24" : "#e2e8f0") : "#475569",
          transform: hovered ? "translate(0,0)" : "translate(4px, 4px)",
          opacity: hovered ? 1 : 0,
        }}
      >→</div>

      {/* Personality mode: animated border sweep on hover */}
      {personality && hovered && (
        <div className="personality-border-sweep" />
      )}
    </div>
  )
}
