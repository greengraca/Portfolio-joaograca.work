import { useRef, useState } from "react"
import { useI18n } from "../i18n/I18nProvider"
import { usePersonality } from "../contexts/PersonalityContext"
import AnimatedText from "./AnimatedText"

function ReactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.6.045-.872.144C4.572 1.975 3.966 3.744 4.13 6.27c-2.19.95-3.626 2.264-3.626 3.734 0 1.47 1.436 2.785 3.626 3.734-.163 2.527.44 4.295 2.1 4.793.272.1.564.145.872.145 1.346 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.31 0 .6-.045.872-.144 1.66-.498 2.264-2.267 2.1-4.794 2.19-.95 3.626-2.264 3.626-3.734s-1.436-2.784-3.626-3.733c.164-2.527-.44-4.296-2.1-4.794a2.013 2.013 0 0 0-.871-.144zM17.92 16.32c.112.493.163.965.163 1.406 0 1.033-.271 1.778-.739 1.938-.145.05-.316.076-.505.076-.943 0-2.29-.658-3.699-1.89a16.28 16.28 0 0 0 1.07-1.178 16.006 16.006 0 0 0 1.57-.387c.096.265.183.527.26.785l-.12.25zm-5.925 3.542c-.81.776-1.622 1.33-2.32 1.598v-.003c-.418.16-.766.212-1.037.122-.467-.156-.74-.9-.74-1.933 0-.44.05-.912.164-1.406a16.14 16.14 0 0 0 1.583.396 16.22 16.22 0 0 0 1.08 1.178l.5.534-.23.514zm-6.766-5.478c-.454-.2-.854-.42-1.18-.657C2.887 12.85 2.5 11.925 2.5 12.004c0-.813.387-1.738 1.549-2.614.326-.238.727-.46 1.18-.657a16.288 16.288 0 0 0 .617 1.543 16.282 16.282 0 0 0-.617 1.543v.365zm1.57-6.462c.238-.07.498-.1.773-.1.942 0 2.29.658 3.699 1.89a16.2 16.2 0 0 0-1.07 1.178 16.09 16.09 0 0 0-1.57.387 11.47 11.47 0 0 1-.163-1.406c0-1.033.271-1.778.739-1.938l-.407-.011zM12 8.1c.74 0 1.477.034 2.202.093.406.49.794 1.026 1.153 1.6.36.574.678 1.165.95 1.763a16.14 16.14 0 0 1-.95 1.766c-.36.573-.747 1.107-1.153 1.6A15.69 15.69 0 0 1 12 15.9c-.74 0-1.477-.034-2.202-.093a15.476 15.476 0 0 1-1.153-1.6 15.995 15.995 0 0 1-.95-1.762c.273-.6.59-1.19.95-1.764.36-.574.747-1.11 1.153-1.6A15.69 15.69 0 0 1 12 8.1z"/>
    </svg>
  )
}
function NodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#68A063" width="12" height="12">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247L8.14 22.016c-.438-.245-.224-.332-.08-.383.653-.228.785-.28 1.482-.677.073-.04.168-.025.243.015l2.255 1.339a.307.307 0 0 0 .285 0l8.795-5.076a.29.29 0 0 0 .141-.252V6.833a.296.296 0 0 0-.143-.255l-8.79-5.072a.286.286 0 0 0-.282 0L3.257 6.578a.297.297 0 0 0-.145.256v10.148c0 .104.057.202.145.252l2.408 1.39c1.308.654 2.107-.116 2.107-.89V7.694c0-.15.119-.267.269-.267h1.174c.149 0 .268.118.268.267v10.04c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.55l-2.307-1.327A1.85 1.85 0 0 1 1.62 17.08V6.932c0-.66.354-1.277.926-1.606L11.34.249a1.919 1.919 0 0 1 1.846 0l8.794 5.077c.572.33.927.946.927 1.606v10.148a1.852 1.852 0 0 1-.927 1.607l-8.794 5.076a1.848 1.848 0 0 1-.924.247"/>
    </svg>
  )
}
function FigmaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117a3.023 3.023 0 0 0 3.02-3.02 3.023 3.023 0 0 0-3.02-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51a3.023 3.023 0 0 0-3.02 3.02 3.023 3.023 0 0 0 3.02 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981a3.023 3.023 0 0 0-3.02 3.019 3.023 3.023 0 0 0 3.02 3.02h3.117V8.981H8.148zM8.172 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.564v4.49c0 2.476-2.014 4.49-4.49 4.49h-.074zm-.024-7.51a3.023 3.023 0 0 0-3.02 3.02 3.023 3.023 0 0 0 3.02 3.02 3.023 3.023 0 0 0 3.02-3.02v-3.02H8.148zm7.704 0a4.491 4.491 0 1 1-.001 8.982 4.491 4.491 0 0 1 .001-8.982zm0 7.509a3.02 3.02 0 1 0 0-6.038 3.02 3.02 0 0 0 0 6.038z" fill="#A259FF"/>
    </svg>
  )
}
function PythonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l8.06.15V.7l.18-.01h.54l.52.03.5.05.49.08.47.12z" fill="#3776AB"/>
      <path d="M9.75 23.82l-.9-.2-.73-.26-.59-.3-.45-.32-.34-.34-.25-.34-.16-.33-.1-.3-.04-.26-.02-.2v-.13V15.5l.05-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02h5.66l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21v-3.06h3.44l.21.03.28.07.32.12.35.18.36.26.36.36.35.46.32.59.28.73.21.88.14 1.05.05 1.23-.06 1.22-.16 1.04-.24.87-.32.71-.36.57-.4.44-.42.33-.42.24-.4.16-.36.1-.32.05-.24.01h-.16l-8.06-.15v1.48l-.18.01h-.54l-.52-.03-.5-.05-.49-.08-.47-.12z" fill="#FFD43B"/>
      <circle cx="13" cy="5.55" r="1.15" fill="#FFD43B"/>
      <circle cx="11" cy="18.45" r="1.15" fill="#3776AB"/>
    </svg>
  )
}
function OutSystemsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.243 16.021l-2.634-1.455-1.584 2.907-1.64-2.882-2.66 1.4.946-2.888L5.8 12l2.87-1.103-.946-2.888 2.66 1.4 1.64-2.882 1.584 2.907 2.634-1.455-1.056 2.918L18.2 12l-3.013 1.103 1.056 2.918z" fill="#E8372C"/>
    </svg>
  )
}
function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

const techIconMap = {
  React: ReactIcon,
  "Node.js": NodeIcon,
  Figma: FigmaIcon,
  Python: PythonIcon,
  OutSystems: OutSystemsIcon,
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  )
}

export default function Hero() {
  const { t } = useI18n()
  const { personality } = usePersonality()
  const touchStartX = useRef(0)
  const [showPhoto, setShowPhoto] = useState(false)

  return (
    <section className="min-h-[85vh] flex items-center relative overflow-hidden">
      <div className="grid-pattern" />
      <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] rounded-full blur-[60px] pointer-events-none transition-all duration-1000"
        style={{ background: personality ? "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)" : "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[20%] -left-[5%] w-[350px] h-[350px] rounded-full blur-[60px] pointer-events-none transition-all duration-1000"
        style={{ background: personality ? "radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)" : "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)" }} />

      {/* Desktop */}
      <div className="hidden md:grid max-w-[1100px] mx-auto px-6 pt-20 pb-16 w-full grid-cols-[1fr_auto] gap-12 items-center relative">
        <HeroContent t={t} personality={personality} />
        <HeroPhoto personality={personality} />
      </div>

      {/* Mobile — swipeable */}
      <div className="md:hidden w-full relative"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (dx < -50) setShowPhoto(true)
          if (dx > 50) setShowPhoto(false)
        }}
      >
        {!showPhoto ? (
          <div className="px-6 pt-16 pb-10 w-full relative animate-fade-in">
            <HeroContent t={t} personality={personality} isMobile />
            <div className="flex items-center justify-center mt-6 text-xs" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
              {t("common.swipePhoto")}
            </div>
          </div>
        ) : (
          <div className="px-6 pt-16 pb-10 w-full flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
            <HeroPhoto personality={personality} mobile />
            <button onClick={() => setShowPhoto(false)} className="mt-6 bg-transparent border-none cursor-pointer text-xs" style={{ color: "var(--text-muted)" }}>
              {t("common.swipeBack")}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function HeroContent({ t, personality, isMobile = false }) {
  return (
    <div className="max-w-[640px]">
      <AnimatedText>
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono mb-5 transition-all duration-500 ${personality ? "personality-badge" : "normal-badge"}`}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: personality ? "#fbbf24" : "#22c55e" }} />
          {personality ? t("personality.statusBadge") : t("hero.statusBadge")}
        </div>
      </AnimatedText>

      <AnimatedText delay={0.1}>
        <h1 className="font-display text-[clamp(32px,5vw,60px)] font-normal leading-[1.1] mb-6 tracking-tight" style={{ color: "var(--text-primary)" }}>
          {personality ? t("personality.title") : t("hero.title")}{" "}
          <span key={personality ? "p" : "n"} className={`italic hero-gradient-text ${personality ? "hero-gradient-personality" : "hero-gradient-normal"}`}>
            {personality ? t("personality.titleHighlight") : t("hero.titleHighlight")}
          </span>
        </h1>
      </AnimatedText>

      <AnimatedText delay={0.2}>
        <p className="font-body text-[15px] md:text-base leading-[1.7] mb-3 max-w-[520px]" style={{ color: "var(--text-secondary)" }}>
          {personality ? t("personality.tagline1") : t("hero.tagline1")}
        </p>
      </AnimatedText>

      <AnimatedText delay={0.25}>
        <p className="font-body text-[14px] md:text-[15px] leading-[1.6] font-semibold mb-8 transition-colors duration-500" style={{ color: personality ? "#fbbf24" : "#60a5fa" }}>
          {personality ? t("personality.tagline2") : t("hero.tagline2")}
        </p>
      </AnimatedText>

      <AnimatedText delay={0.3}>
        <div className="flex flex-wrap gap-2 mb-7">
          {["React", "Node.js", "Figma", "Python", "OutSystems"].map(tech => {
            const Icon = techIconMap[tech]
            return (
              <span key={tech} className="tech-pill inline-flex items-center gap-[6px] px-3 py-[5px] rounded-lg text-xs font-medium font-mono cursor-default">
                <Icon /> {tech}
              </span>
            )
          })}
        </div>
      </AnimatedText>

      <AnimatedText delay={0.4}>
        <div className="flex items-center gap-3 flex-wrap">
          <a href="https://www.linkedin.com/in/joaopmgraca/" target="_blank" rel="noopener noreferrer"
            className={`social-icon-btn ${isMobile && personality ? "mobile-social" : ""}`} aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="https://github.com/greengraca" target="_blank" rel="noopener noreferrer"
            className={`social-icon-btn ${isMobile && personality ? "mobile-social" : ""}`} aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href="#projects"
            className="cta-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-white text-sm font-semibold font-body no-underline transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: personality ? "linear-gradient(135deg, #f59e0b, #ef4444)" : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              boxShadow: personality ? "0 4px 20px rgba(245,158,11,0.3)" : "0 4px 20px rgba(59,130,246,0.3)",
            }}>
            {personality ? t("personality.scrollCta") : t("hero.scrollCta")} ↓
          </a>
        </div>
      </AnimatedText>
    </div>
  )
}

function HeroPhoto({ personality, mobile = false }) {
  return (
    <AnimatedText delay={0.2}>
      <div className="relative">
        <div className="overflow-hidden transition-transform duration-600"
          style={{
            width: mobile ? 240 : 280, height: mobile ? 360 : 340,
            borderRadius: 24, border: "1px solid var(--border)",
            boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
            transform: personality ? "rotate(3deg)" : "none",
          }}>
          <img src="/profile.jpg" alt="João Graça" className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = "none"; e.target.parentElement.style.background = "linear-gradient(135deg, #1e293b, #334155)" }} />
        </div>
        <div className="absolute -top-3 -right-3 w-20 h-20 rounded-2xl transition-all duration-500"
          style={{ border: `2px solid ${personality ? "rgba(245,158,11,0.3)" : "rgba(59,130,246,0.2)"}`, transform: personality ? "rotate(12deg)" : "rotate(6deg)" }} />
        <div className="absolute -bottom-2 -left-2 w-[60px] h-[60px] rounded-xl transition-all duration-500"
          style={{ background: personality ? "rgba(245,158,11,0.06)" : "rgba(139,92,246,0.06)", border: `1px solid ${personality ? "rgba(245,158,11,0.15)" : "rgba(139,92,246,0.1)"}`, transform: personality ? "rotate(-8deg)" : "rotate(-3deg)" }} />
        {personality && <div className="absolute -top-5 left-5 text-[28px] animate-float">🐸</div>}

        {/* Location */}
        <div className="flex items-center gap-1.5 mt-4 justify-center" style={{ color: "var(--text-muted)" }}>
          <MapPinIcon />
          <span className="text-[12px] font-mono font-medium">Caldas da Rainha, Portugal</span>
        </div>
      </div>
    </AnimatedText>
  )
}
