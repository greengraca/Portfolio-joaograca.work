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

  /* The ENTIRE card is one overflow:hidden box with a single bg.
     Image and content are siblings inside — no seam possible. */
  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="project-card cursor-pointer relative flex flex-col"
      style={{
        gridColumn: isFullWidth ? "span 2" : "span 1",
        borderRadius: 20,
        /* Single solid background on the whole card */
        background: "var(--card-inner-bg)",
        border: "1px solid var(--card-border)",
        boxShadow: hovered ? "var(--card-shadow-hover)" : "var(--card-shadow)",
        transform: vis ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(30px)",
        opacity: vis ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${index * 0.08}s`,
        minHeight: isFullWidth ? 320 : 380,
        /* overflow hidden clips image scale AND rounds corners */
        overflow: "hidden",
      }}
    >
      {/* Image area — NO separate bg, parent bg shows through */}
      <div style={{ position: "relative", width: "100%", height: 200, flexShrink: 0, overflow: "hidden" }}>
        <img
          src={coverSrc}
          alt={project.title}
          loading="lazy"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "top",
            display: "block",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
          onError={(e) => { e.target.style.display = "none" }}
        />
        {/* Bottom gradient fade to card bg — no gap possible since card bg is one color */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: 80,
          background: "linear-gradient(to top, var(--card-inner-bg) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* Year badge */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-[10px] border border-white/10 text-[11px] font-semibold font-mono"
          style={{ color: "#94a3b8", zIndex: 5 }}>
          {project.year}
        </div>
      </div>

      {/* Content — sits directly below, same parent bg */}
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
      <div className="absolute bottom-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all duration-300"
        style={{
          background: hovered ? (personality ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.08)") : "transparent",
          color: hovered ? (personality ? "#fbbf24" : "#e2e8f0") : "#475569",
          transform: hovered ? "translate(0,0)" : "translate(4px, 4px)",
          opacity: hovered ? 1 : 0,
          zIndex: 5,
        }}>→</div>
    </div>
  )
}
