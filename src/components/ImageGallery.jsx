import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react"

const ImageGallery = forwardRef(function ImageGallery(
  { images = [], title = "", hideFirstThumb = false },
  ref
) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  // expose .open(index)
  useImperativeHandle(ref, () => ({
    open: (i = 0) => { setIndex(i); setOpen(true) }
  }))

  const close = () => setOpen(false)
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, prev, next])

  useEffect(() => {
    if (!open) return
    let startX = 0
    const onStart = (e) => (startX = e.touches?.[0]?.clientX ?? 0)
    const onMove = (e) => {
      const dx = (e.touches?.[0]?.clientX ?? 0) - startX
      if (Math.abs(dx) > 60) { dx > 0 ? prev() : next(); startX = e.touches?.[0]?.clientX ?? 0 }
    }
    const overlay = document.getElementById("lightbox-overlay")
    overlay?.addEventListener("touchstart", onStart, { passive: true })
    overlay?.addEventListener("touchmove", onMove, { passive: true })
    return () => {
      overlay?.removeEventListener("touchstart", onStart)
      overlay?.removeEventListener("touchmove", onMove)
    }
  }, [open, prev, next])

  if (!images.length) return null

  const Thumb = ({ base, i }) => (
    <button
      onClick={() => ref?.current?.open?.(i)}
      className="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800
                 bg-white dark:bg-white/5 shadow-sm hover:shadow-md transition
                 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      aria-label={`Open image ${i + 1} of ${images.length}`}
    >
      <img
        src={`${base}-800.webp`}
        alt={`${title} screenshot ${i + 1}`}
        loading="lazy"
        width="800" height="500"
        className="w-full h-28 md:h-32 object-cover object-top transition-transform duration-200 group-hover:scale-[1.01]"
        onError={(e) => { e.currentTarget.src = "/images/placeholder.png" }}
        sizes="(max-width: 768px) 50vw, 33vw"
        srcSet={`
          ${base}-400.webp 400w,
          ${base}-800.webp 800w,
          ${base}-1200.webp 1200w
        `}
      />
    </button>
  )

  return (
    <>
      {/* Thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        {images.map((base, i) => (
          (hideFirstThumb && i === 0) ? null : <Thumb key={i} base={base} i={i} />
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          id="lightbox-overlay"
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target.id === "lightbox-overlay" && close()}
          role="dialog" aria-modal="true"
        >
          <div className="relative max-w-5xl w-full">
            <img
              src={`${images[index]}-1200.webp`}
              alt={`${title} enlarged`}
              className="w-full max-h-[80vh] object-contain rounded-xl border border-brand-border bg-black/20"
              onError={(e) => { e.currentTarget.src = "/images/placeholder.png" }}
              sizes="100vw"
              srcSet={`
                ${images[index]}-800.webp 800w,
                ${images[index]}-1200.webp 1200w
              `}
            />

            <button
              onClick={close}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-lg border border-brand-border text-gray-200 hover:bg-brand-hover-subtle"
              aria-label="Close"
            >✕</button>

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg border border-brand-border text-gray-200 hover:bg-brand-hover-subtle"
                  aria-label="Previous"
                >‹</button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg border border-brand-border text-gray-200 hover:bg-brand-hover-subtle"
                  aria-label="Next"
                >›</button>
              </>
            )}

            <div className="absolute bottom-3 right-3 text-xs text-gray-300">
              {index + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
})

export default ImageGallery
