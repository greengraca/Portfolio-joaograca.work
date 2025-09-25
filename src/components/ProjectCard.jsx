import { useId, useRef } from "react"
import { FiChevronDown } from "react-icons/fi"
import ImageGallery from "./ImageGallery"


function TechBadge({ children }) {
    return (
        <span className="inline-block px-2 py-0.5 text-[11px] rounded-full border border-gray-200 dark:border-gray-700 mr-2 mb-2 text-gray-600 dark:text-gray-300">
            {children}
        </span>
    )
}

export default function ProjectCard({ project, expanded, onToggle }) {
    const contentId = useId()
    const galleryRef = useRef(null)
    const allImages = project.cover
        ? [project.cover, ...(project.images || [])]
        : (project.images || [])

    return (
        <article
            className={`h-full md:min-h-[175px] p-4 md:p-6 rounded-2xl border shadow-sm transition-all duration-300 flex flex-col
                ${expanded
                    ? "bg-gray-50 border-gray-300 dark:bg-brand-active dark:border-brand-active-border"
                    : "bg-white border-gray-200 dark:bg-[#1E2730] dark:border-brand-border hover:bg-gray-100 dark:hover:bg-brand-hover-subtle hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
                }`}
        >
            <button
                onClick={onToggle}
                aria-expanded={expanded}
                aria-controls={contentId}
                className="w-full text-left"
            >
                <div className="flex items-start justify-between mt-2 md:mt-0">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100" >
                            {project.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {project.subtitle} • <span className="font-mono">{project.year}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:block text-xs text-gray-500 dark:text-gray-400">
                            {project.tech.join(" · ")}
                        </div>
                        <FiChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform ${expanded ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                </div>
                <p
                    className={`text-gray-700 dark:text-gray-300 mt-3 md:mt-4 ${expanded ? '' : 'line-clamp-3 md:line-clamp-2'
                        }`}
                >
                    {project.description}
                </p>
            </button>

            <div className="mt-3 md:hidden">
                {project.tech.map((t) => (
                    <TechBadge key={t}>{t}</TechBadge>
                ))}
            </div>

            <div id={contentId} className={`overflow-hidden transition-[grid-template-rows] duration-300 grid mt-3 md:mt-4 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="min-h-0">
                    <div className="pt-3 md:pt-4 border-t border-gray-100 dark:border-gray-800">

                        {expanded && project.cover && (
                            <div className="mb-4">
                                <button
                                    onClick={() => galleryRef.current?.open(0)}
                                    className="block w-full"
                                    aria-label="Open cover in lightbox"
                                >
                                    <img
                                        src={`${project.cover}-1200.webp`}
                                        alt={`${project.title} cover`}
                                        className="w-full h-auto max-h-[70vh] object-contain rounded-xl border border-gray-200 dark:border-gray-800 cursor-pointer transition-transform duration-200 hover:scale-[1.01] bg-gray-100 dark:bg-gray-800"
                                        loading="lazy"
                                        width="1200" height="675"
                                        sizes="100vw"
                                        srcSet={`
                      ${project.cover}-800.webp 800w,
                      ${project.cover}-1200.webp 1200w
                    `}
                                        onError={(e) => { e.currentTarget.src = "/images/placeholder.png" }}
                                    />
                                </button>
                            </div>
                        )}

                        {/* Details */}
                        {project.details?.length ? (
                            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                {project.details.map((d, i) => <li key={i}>{d}</li>)}
                            </ul>
                        ) : null}

                        {/* Links */}
                        {project.links?.length ? (
                            <div className="flex flex-wrap gap-2 md:gap-3 mt-3 md:mt-4 mb-8">
                                {project.links.map((l, i) => (
                                    <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                                        className="px-3 py-2 rounded-lg border border-gray-200 dark:border-brand-border text-sm text-gray-700 dark:text-gray-300 transition hover:bg-gray-100 dark:hover:bg-brand-hover-subtle dark:hover:text-white">
                                        {l.label} →
                                    </a>
                                ))}
                            </div>
                        ) : null}

                        {/* Gallery */}
                        {allImages.length ? (
                            <ImageGallery ref={galleryRef} images={allImages} title={project.title} hideFirstThumb={!!project.cover} />
                        ) : (
                            <div className="mt-4">
                                <img
                                    src="/images/placeholder.png"
                                    alt="Placeholder"
                                    className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-800"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </article >
    )
}
