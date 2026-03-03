import { useEffect, useState, useCallback } from "react"
import { X } from "lucide-react"
import { useI18n } from "../i18n/I18nProvider"
import { usePersonality } from "../contexts/PersonalityContext"

export default function ProjectModal({ project, onClose }) {
  const { t } = useI18n()
  const { personality } = usePersonality()
  const [lightboxIdx, setLightboxIdx] = useState(-1)

  // Live translations so personality toggle updates content
  const tr = t(`projects.${project.id}`) || {}
  const description = personality && tr.descPersonality ? tr.descPersonality : (tr.description || project.description)
  const title = tr.title || project.title
  const subtitle = tr.subtitle || project.subtitle
  const details = tr.details || project.details || []
  const linkLabels = tr.links || {}

  const allImages = project.cover
    ? [project.cover, ...(project.images || [])]
    : (project.images || [])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const h = (e) => {
      if (e.key === "Escape") { lightboxIdx >= 0 ? setLightboxIdx(-1) : onClose() }
    }
    window.addEventListener("keydown", h)
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", h) }
  }, [onClose, lightboxIdx])

  const isExternal = (src) => src?.startsWith("http")
  const hasImage = project.cover || project.images?.length > 0
  const rawCover = project.cover || project.images?.[0] || null
  const coverSrc = rawCover
    ? (isExternal(rawCover) ? rawCover : `${rawCover}-1200.webp`)
    : null

  const prev = useCallback(() => setLightboxIdx(i => (i - 1 + allImages.length) % allImages.length), [allImages.length])
  const next = useCallback(() => setLightboxIdx(i => (i + 1) % allImages.length), [allImages.length])

  useEffect(() => {
    if (lightboxIdx < 0) return
    const h = (e) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next() }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [lightboxIdx, prev, next])

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-fade-in">
        <div onClick={onClose} className="absolute inset-0 bg-black/75 backdrop-blur-xl" />

        <div className="relative max-w-[720px] w-full max-h-[85vh] overflow-y-auto rounded-3xl animate-slide-up no-scrollbar"
          style={{ background: "var(--modal-bg)", border: "1px solid var(--border)", boxShadow: "0 40px 120px rgba(0,0,0,0.6)" }}>

          {/* Close button overlaid on image */}
          <button onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-[10px] border bg-black/50 backdrop-blur-[10px] flex items-center justify-center cursor-pointer hover:bg-black/70 transition"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: "#94a3b8" }}>
            <X size={16} />
          </button>

          {/* Cover image — flush to top */}
          <div className="w-full overflow-hidden rounded-t-3xl"
            style={{ height: 280, background: `linear-gradient(135deg, ${project.color}25, ${project.color}08)` }}
            onClick={() => allImages.length > 0 && setLightboxIdx(0)}
            {...(allImages.length > 0 ? { className: "w-full overflow-hidden cursor-pointer rounded-t-3xl" } : {})}>
            {hasImage && coverSrc ? (
              <img src={coverSrc} alt={title}
                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                style={{ display: "block" }}
                onError={(e) => { e.target.style.display = "none" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {project.icon && <span style={{ fontSize: 64, opacity: 0.5 }}>{project.icon}</span>}
              </div>
            )}
          </div>

          <div className="px-6 md:px-8 pt-7 pb-9">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-3">
              <span className="text-xs font-mono font-semibold" style={{ color: project.accentDark }}>{project.year}</span>
              <span className="hidden md:inline" style={{ color: "var(--text-muted)" }}>•</span>
              <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{project.tech.join(" · ")}</span>
            </div>

            <h2 className="font-body text-[28px] md:text-[32px] font-bold mb-1 leading-tight" style={{ color: "var(--text-primary)" }}>{title}</h2>
            <p className="text-sm font-medium mb-5" style={{ color: project.accentDark }}>{subtitle}</p>
            <p className="font-body text-[15px] leading-[1.8] mb-6" style={{ color: "var(--text-secondary)" }}>{description}</p>

            {details.length > 0 && (
              <div className="mb-6">
                {details.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5 py-2"
                    style={{ borderBottom: i < details.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                    <span className="text-sm mt-0.5" style={{ color: project.accentDark }}>→</span>
                    <span className="text-sm leading-[1.5]" style={{ color: "var(--text-tertiary)" }}>{d}</span>
                  </div>
                ))}
              </div>
            )}

            {project.links?.length > 0 && (
              <div className="flex flex-wrap gap-2.5 mb-6">
                {project.links.map((l, i) => (
                  <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                    className="modal-link font-body px-4 py-2.5 rounded-[10px] border text-[13px] font-semibold no-underline flex items-center gap-1.5"
                    style={{ borderColor: personality ? "rgba(245,158,11,0.2)" : "var(--border)", color: "var(--text-primary)" }}>
                    {linkLabels[l.id] || l.label || l.id.charAt(0).toUpperCase() + l.id.slice(1)} ↗
                  </a>
                ))}
              </div>
            )}

            {allImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {allImages.map((base, i) => {
                  if (project.cover && i === 0) return null
                  return (
                    <button key={i} onClick={() => setLightboxIdx(i)}
                      className="gallery-thumb relative rounded-xl overflow-hidden border transition group cursor-pointer"
                      style={{ borderColor: "var(--border-subtle)" }}>
                      <img src={isExternal(base) ? base : `${base}-800.webp`} alt={`${title} ${i + 1}`} loading="lazy"
                        className="w-full h-28 md:h-32 object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                        style={{ display: "block" }}
                        onError={(e) => { e.target.src = "/images/placeholder.png" }} />
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx >= 0 && allImages[lightboxIdx] && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setLightboxIdx(-1) }}>
          <div className="relative max-w-5xl w-full">
            <img src={isExternal(allImages[lightboxIdx]) ? allImages[lightboxIdx] : `${allImages[lightboxIdx]}-1200.webp`} alt={`${title}`}
              className="w-full max-h-[80vh] object-contain rounded-xl"
              onError={(e) => { e.target.src = "/images/placeholder.png" }} />
            <button onClick={() => setLightboxIdx(-1)}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-lg border border-white/15 text-gray-200 hover:bg-white/10 transition cursor-pointer bg-black/40 backdrop-blur-sm">✕</button>
            {allImages.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg border border-white/15 text-gray-200 hover:bg-white/10 transition cursor-pointer bg-black/40 backdrop-blur-sm text-lg">‹</button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg border border-white/15 text-gray-200 hover:bg-white/10 transition cursor-pointer bg-black/40 backdrop-blur-sm text-lg">›</button>
              </>
            )}
            <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
              {lightboxIdx + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
