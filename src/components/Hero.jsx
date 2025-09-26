import { SiLinkedin, SiGithub } from "react-icons/si"
import { useEffect, useRef } from "react"
import { SiReact, SiNodedotjs, SiFigma, SiPython } from "react-icons/si"
import OutSystemsIcon from "../icons/oslogo.svg?react"
import { useI18n } from "../i18n/I18nProvider";


const techHoverStyles = {
    React: "hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400",
    "Node.js": "hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400",
    Figma: "hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-900/20 dark:hover:text-pink-400",
    Python: "hover:bg-yellow-50 hover:text-yellow-600 dark:hover:bg-yellow-900/20 dark:hover:text-yellow-400",
    OutSystems: "hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400",
}

const techIcons = {
    React: SiReact,
    "Node.js": SiNodedotjs,
    Figma: SiFigma,
    Python: SiPython,
    OutSystems: OutSystemsIcon,
}

function Badge({ tech }) {
    const Icon = techIcons[tech]
    return (
        <span
            className={`
        inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-xs rounded-full
        border border-gray-300 dark:border-gray-700
        text-gray-600 dark:text-gray-300
        bg-gray-100 dark:bg-[#1E2730]
        transition-colors duration-200 cursor-default
        ${techHoverStyles[tech] || ""}
      `}
        >
            {Icon && <Icon className="w-3 h-3" />}
            {tech}
        </span>
    )
}


export default function Hero() {
    const { t } = useI18n();
    const parallaxRef = useRef(null)

    useEffect(() => {
        const el = parallaxRef.current
        if (!el) return
        const onScroll = () => {
            const rect = el.getBoundingClientRect()
            const progress = Math.min(Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0), 1)
            const y = (progress - 0.5) * 8 // range ~ -4px .. 4px
            el.style.transform = `translateY(${y.toFixed(1)}px)`
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center mb-24 md:mb-36">
            {/* Photo first on mobile, right on desktop */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end w-full">
                <div
                    ref={parallaxRef}
                    className="w-full h-56 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-xl
                     ring-1 ring-gray-200 dark:ring-0 dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] will-change-transform"
                >
                    <img alt="João" src="/profile.jpg" className="w-full h-full object-cover" loading="lazy" />
                </div>
            </div>

            <div className="order-2 md:order-1 md:col-span-2 mt-4 md:mt-0">
                <h2 className="text-2xl md:text-4xl font-bold mb-5 md:mb-6">
                    {t("hero.title")}
                </h2>
                <p className="text-sm md:text-lg text-gray-700 dark:text-gray-300 mb-3">
                    {t("hero.tagline1")}
                </p>

                <p className="text-sm md:text-lg text-gray-700 dark:text-gray-300 mb-5">
                    {t("hero.tagline2")}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-5">
                    <Badge tech="React" />
                    <Badge tech="Node.js" />
                    <Badge tech="Figma" />
                    <Badge tech="Python" />
                    <Badge tech="OutSystems" />
                </div>

                {/* Socials */}
                <div className="flex flex-wrap gap-3">
                    <a
                        href="https://www.linkedin.com/in/joaopmgraca/"
                        target="_blank" rel="noopener noreferrer"
                        className="group relative p-2 rounded-lg border border-brand-border
               text-gray-700 dark:text-gray-300 transition
               hover:text-brand-accent hover:border-brand-accent/70
               pulse-subtle"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                    >
                        <SiLinkedin className="w-5 h-5 text-gray-700 dark:text-gray-300 dark:group-hover:text-white" />
                        <span className="hidden md:block absolute -bottom-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[10px] rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-80 transition-opacity duration-200 pointer-events-none">LinkedIn</span>
                    </a>

                    <a
                        href="https://github.com/greengraca"
                        target="_blank" rel="noopener noreferrer"
                        className="group relative p-2 rounded-lg border border-brand-border
               text-gray-700 dark:text-gray-300 transition
               hover:text-brand-accent hover:border-brand-accent/70
               pulse-subtle"
                        aria-label="GitHub"
                        title="GitHub"
                    >
                        <SiGithub className="w-5 h-5 text-gray-700 dark:text-gray-300 dark:group-hover:text-white" />
                        <span className="hidden md:block absolute -bottom-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[10px] rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-80 transition-opacity duration-200 pointer-events-none">GitHub</span>
                    </a>

                    <a
                        href="/JoaoGraca-CV.pdf" target="_blank" rel="noopener noreferrer"
                        className="group relative flex items-center justify-center px-3 py-2 rounded-lg
               border border-brand-border text-sm font-semibold
               text-gray-700 dark:text-gray-300 transition
               hover:text-brand-accent hover:border-brand-accent/70 pulse-subtle"
                        title="Check my Curriculum"
                    >
                        CV
                        <span className="hidden md:block absolute -bottom-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[10px] rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-80 transition-opacity duration-200 pointer-events-none">Curriculum</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
