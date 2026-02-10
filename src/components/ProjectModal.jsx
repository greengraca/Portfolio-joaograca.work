import { useEffect, useState, useCallback } from "react"
import { usePersonality } from "../contexts/PersonalityContext"

export default function ProjectModal({ project, onClose }) {
  const { personality } = usePersonality()
  const [lightboxIdx, setLightboxIdx] = useState(-1)

  const allImages = project.cover
    ? [project.cover, ...(project.images || [])]
    : (project.images || [])

  // Lock body scroll + Escape key
  useEffect(() => {
    document.body.style.overflow = "hidden"
    const h = (e) => {
      if (e.key === "Escape") {
        if (lightboxIdx >= 0) setLightboxIdx(-1)
        else onClose()
      }
    }
    window.addEventListener("keydown", h)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", h)
    }
  }, [onClose, lightboxIdx])

  const coverSrc = project.cover
    ? `${project.cover}-1200.webp`
    : project.images?.[0]
      ? `${project.images[0]}-1200.webp`
      : "/images/placeholder.png"

  const prev = useCallback(() => setLightboxIdx(i => (i - 1 + allImages.length) % allImages.length), [allImages.length])
  const next = useCallback(() => setLightboxIdx(i => (i + 1) % allImages.length), [allImages.length])

  // Lightbox arrow keys
  useEffect(() => {
    if (lightboxIdx < 0) return
    const h = (e) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [lightboxIdx, prev, next])

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-fade-in">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-xl"
        />

        {/* Modal */}
        <div
          className="relative max-w-[720px] w-full max-h-[85vh] overflow-y-auto rounded-3xl animate-slide-up no-scrollbar"
          style={{
            background: "linear-gradient(135deg, #0f1419, #1a2030)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="sticky top-4 float-right mr-4 z-10 w-9 h-9 rounded-[10px] border border-white/10 bg-black/50 backdrop-blur-[10px] text-gray-400 text-base flex items-center justify-center cursor-pointer hover:text-gray-200 hover:bg-black/70 transition"
          >×</button>

          {/* Cover */}
          <div
            className="w-full h-[280px] overflow-hidden rounded-t-3xl cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}08)` }}
            onClick={() => allImages.length > 0 && setLightboxIdx(0)}
          >
            <img
              src={coverSrc}
              alt={project.title}
              className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
              onError={(e) => { e.target.style.display = "none" }}
            />
          </div>

          <div className="px-8 pt-7 pb-9">
            {/* Meta */}
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-xs font-mono font-semibold" style={{ color: project.accentDark }}>{project.year}</span>
              <span className="text-gray-600">•</span>
              <span className="text-xs text-gray-500 font-mono">{project.tech.join(" · ")}</span>
            </div>

            <h2 className="font-display text-[32px] font-normal text-gray-100 mb-1">{project.title}</h2>
            <p className="text-sm font-medium mb-5" style={{ color: project.accentDark }}>{project.subtitle}</p>

            <p className="font-body text-[15px] leading-[1.8] text-gray-400 mb-6">{project.description}</p>

            {/* Details */}
            {project.details?.length > 0 && (
              <div className="mb-6">
                {project.details.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 py-2"
                    style={{ borderBottom: i < project.details.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                  >
                    <span className="text-sm mt-0.5" style={{ color: project.accentDark }}>→</span>
                    <span className="text-sm text-gray-300 leading-[1.5]">{d}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Links */}
            {project.links?.length > 0 && (
              <div className="flex flex-wrap gap-2.5 mb-6">
                {project.links.map((l, i) => (
                  <a
                    key={i}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body px-4 py-2.5 rounded-[10px] border border-white/10 text-gray-200 text-[13px] font-semibold no-underline hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-center gap-1.5"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}

            {/* Gallery thumbnails */}
            {allImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {allImages.map((base, i) => {
                  // Skip the cover thumb if it's the first image (already shown above)
                  if (project.cover && i === 0) return null
                  return (
                    <button
                      key={i}
                      onClick={() => setLightboxIdx(i)}
                      className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-white/15 transition group cursor-pointer"
                    >
                      <img
                        src={`${base}-800.webp`}
                        alt={`${project.title} screenshot ${i + 1}`}
                        loading="lazy"
                        className="w-full h-28 md:h-32 object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                        onError={(e) => { e.target.src = "/images/placeholder.png" }}
                      />
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
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setLightboxIdx(-1) }}
        >
          <div className="relative max-w-5xl w-full">
            <img
              src={`${allImages[lightboxIdx]}-1200.webp`}
              alt={`${project.title} enlarged`}
              className="w-full max-h-[80vh] object-contain rounded-xl"
              onError={(e) => { e.target.src = "/images/placeholder.png" }}
            />
            <button
              onClick={() => setLightboxIdx(-1)}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-lg border border-white/15 text-gray-200 hover:bg-white/10 transition cursor-pointer bg-black/40 backdrop-blur-sm"
            >✕</button>
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
