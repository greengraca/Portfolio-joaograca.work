import { useState } from "react"
import useScrollReveal from "../hooks/useScrollReveal"
import { usePersonality } from "../contexts/PersonalityContext"

export default function ProjectCard({ project, onClick, index }) {
  const [ref, vis] = useScrollReveal()
  const [hovered, setHovered] = useState(false)
  const { personality } = usePersonality()

  const isWide = index === 0 || index === 3
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
      className="cursor-pointer relative overflow-hidden rounded-[20px] flex flex-col transition-all duration-500"
      style={{
        gridColumn: isWide ? "span 2" : "span 1",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
        background: hovered ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
        transform: vis ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(30px)",
        opacity: vis ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
        minHeight: isWide ? 320 : 380,
      }}
    >
      {/* Cover image */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 200,
          background: `linear-gradient(135deg, ${project.color}15, ${project.color}08)`,
        }}
      >
        <img
          src={coverSrc}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-600"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          loading="lazy"
          onError={(e) => { e.target.style.display = "none" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,15,20,0.9)] via-[rgba(10,15,20,0.1)] to-transparent" />

        {/* Year badge */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-[10px] border border-white/10 text-[11px] font-semibold font-mono text-gray-400">
          {project.year}
        </div>

        {personality && (
          <div className="absolute top-3.5 left-3.5 text-[22px] drop-shadow-md">
            {project.icon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 pb-6 flex-1 flex flex-col">
        <h3 className="font-display text-[22px] font-normal text-gray-100 mb-1 leading-tight">
          {project.title}
        </h3>
        <p className="text-xs font-semibold font-mono mb-3" style={{ color: project.accentDark }}>
          {project.subtitle}
        </p>
        <p className="font-body text-sm leading-[1.6] text-gray-400 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-3.5">
          {project.tech.map(t => (
            <span key={t} className="text-[11px] px-2 py-[3px] rounded-md bg-white/[0.04] border border-white/[0.06] text-gray-500 font-mono">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Hover arrow */}
      <div
        className="absolute bottom-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all duration-300"
        style={{
          background: hovered ? "rgba(255,255,255,0.08)" : "transparent",
          color: hovered ? "#e2e8f0" : "#475569",
          transform: hovered ? "translate(0,0)" : "translate(4px, 4px)",
          opacity: hovered ? 1 : 0,
        }}
      >→</div>
    </div>
  )
}
