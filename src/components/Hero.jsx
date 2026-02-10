import { useRef, useState } from "react"
import { useI18n } from "../i18n/I18nProvider"
import { usePersonality } from "../contexts/PersonalityContext"
import AnimatedText from "./AnimatedText"

const techIcons = { React: "⚛️", "Node.js": "🟢", Figma: "🎨", Python: "🐍", OutSystems: "⚡" }

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

  // Mobile swipe for photo
  const touchStartX = useRef(0)
  const [showPhoto, setShowPhoto] = useState(false)

  return (
    <section className="min-h-[85vh] flex items-center relative overflow-hidden">
      {/* Grid pattern */}
      <div className="grid-pattern" />

      {/* Gradient orbs */}
      <div
        className="absolute top-[10%] right-[10%] w-[400px] h-[400px] rounded-full blur-[60px] pointer-events-none transition-all duration-1000"
        style={{
          background: personality
            ? "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[20%] -left-[5%] w-[350px] h-[350px] rounded-full blur-[60px] pointer-events-none transition-all duration-1000"
        style={{
          background: personality
            ? "radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Desktop layout */}
      <div className="hidden md:grid max-w-[1100px] mx-auto px-6 pt-20 pb-16 w-full grid-cols-[1fr_auto] gap-12 items-center relative">
        <HeroContent t={t} personality={personality} />
        <HeroPhoto personality={personality} />
      </div>

      {/* Mobile layout — horizontal swipe */}
      <div
        className="md:hidden w-full relative"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (dx < -50) setShowPhoto(true)
          if (dx > 50) setShowPhoto(false)
        }}
      >
        {!showPhoto ? (
          <div className="px-6 pt-16 pb-10 w-full relative animate-fade-in">
            <HeroContent t={t} personality={personality} />
            <div className="flex items-center justify-center gap-2 mt-6 text-xs" style={{ color: "var(--text-muted)" }}>
              <span style={{ opacity: 0.5 }}>swipe for photo →</span>
            </div>
          </div>
        ) : (
          <div className="px-6 pt-16 pb-10 w-full flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
            <HeroPhoto personality={personality} mobile />
            <button
              onClick={() => setShowPhoto(false)}
              className="mt-6 bg-transparent border-none cursor-pointer text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              ← swipe back
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function HeroContent({ t, personality }) {
  return (
    <div className="max-w-[640px]">
      {/* Status badge */}
      <AnimatedText>
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono mb-5 transition-all duration-500 ${personality ? "personality-badge" : "normal-badge"}`}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: personality ? "#fbbf24" : "#22c55e" }} />
          {personality ? t("personality.statusBadge") : t("hero.statusBadge")}
        </div>
      </AnimatedText>

      {/* Title — key forces remount to avoid gradient paint bug */}
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

      {/* Tech pills */}
      <AnimatedText delay={0.3}>
        <div className="flex flex-wrap gap-2 mb-7">
          {["React", "Node.js", "Figma", "Python", "OutSystems"].map(tech => (
            <span key={tech} className="tech-pill inline-flex items-center gap-[5px] px-3 py-[5px] rounded-lg text-xs font-medium font-mono cursor-default">
              <span className="text-[11px]">{techIcons[tech]}</span> {tech}
            </span>
          ))}
        </div>
      </AnimatedText>

      {/* Social icons + CTA */}
      <AnimatedText delay={0.4}>
        <div className="flex items-center gap-3 flex-wrap">
          <a href="https://www.linkedin.com/in/joaopmgraca/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="https://github.com/greengraca" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a
            href="#projects"
            className="cta-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-white text-sm font-semibold font-body no-underline transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: personality ? "linear-gradient(135deg, #f59e0b, #ef4444)" : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              boxShadow: personality ? "0 4px 20px rgba(245,158,11,0.3)" : "0 4px 20px rgba(59,130,246,0.3)",
            }}
          >
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
        <div
          className="overflow-hidden transition-transform duration-600"
          style={{
            width: mobile ? 240 : 280,
            height: mobile ? 300 : 340,
            borderRadius: 24,
            border: "1px solid var(--border)",
            boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
            transform: personality ? "rotate(3deg)" : "none",
          }}
        >
          <img src="/profile.jpg" alt="João Graça" className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = "none"; e.target.parentElement.style.background = "linear-gradient(135deg, #1e293b, #334155)" }}
          />
        </div>
        <div className="absolute -top-3 -right-3 w-20 h-20 rounded-2xl transition-all duration-500"
          style={{ border: `2px solid ${personality ? "rgba(245,158,11,0.3)" : "rgba(59,130,246,0.2)"}`, transform: personality ? "rotate(12deg)" : "rotate(6deg)" }} />
        <div className="absolute -bottom-2 -left-2 w-[60px] h-[60px] rounded-xl transition-all duration-500"
          style={{ background: personality ? "rgba(245,158,11,0.06)" : "rgba(139,92,246,0.06)", border: `1px solid ${personality ? "rgba(245,158,11,0.15)" : "rgba(139,92,246,0.1)"}`, transform: personality ? "rotate(-8deg)" : "rotate(-3deg)" }} />
        {personality && <div className="absolute -top-5 left-5 text-[28px] animate-float">🐸</div>}
      </div>
    </AnimatedText>
  )
}
