import { useI18n } from "../i18n/I18nProvider"
import { usePersonality } from "../contexts/PersonalityContext"
import AnimatedText from "./AnimatedText"

const techIcons = { React: "⚛️", "Node.js": "🟢", Figma: "🎨", Python: "🐍", OutSystems: "⚡" }

export default function Hero() {
  const { t } = useI18n()
  const { personality } = usePersonality()

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

      <div className="hero-content max-w-[1100px] mx-auto px-6 pt-20 pb-16 w-full grid grid-cols-[1fr_auto] gap-12 items-center relative">
        <div className="max-w-[640px]">
          {/* Status badge */}
          <AnimatedText>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono mb-5 transition-all duration-500"
              style={{
                background: personality ? "rgba(245,158,11,0.1)" : "rgba(59,130,246,0.08)",
                border: `1px solid ${personality ? "rgba(245,158,11,0.2)" : "rgba(59,130,246,0.15)"}`,
                color: personality ? "#fbbf24" : "#60a5fa",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                style={{ background: personality ? "#fbbf24" : "#22c55e" }}
              />
              {personality ? t("personality.statusBadge") : t("hero.statusBadge")}
            </div>
          </AnimatedText>

          {/* Title */}
          <AnimatedText delay={0.1}>
            <h1 className="font-display text-[clamp(36px,5vw,60px)] font-normal leading-[1.1] mb-6 text-gray-100 tracking-tight">
              {personality ? t("personality.title") : t("hero.title")}{" "}
              <span
                className="italic transition-all duration-500"
                style={{
                  background: personality
                    ? "linear-gradient(135deg, #fbbf24, #ef4444)"
                    : "linear-gradient(135deg, #60a5fa, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {personality ? t("personality.titleHighlight") : t("hero.titleHighlight")}
              </span>
            </h1>
          </AnimatedText>

          {/* Taglines */}
          <AnimatedText delay={0.2}>
            <p className="font-body text-base leading-[1.7] text-gray-400 mb-3 max-w-[520px]">
              {personality ? t("personality.tagline1") : t("hero.tagline1")}
            </p>
          </AnimatedText>

          <AnimatedText delay={0.25}>
            <p
              className="font-body text-[15px] leading-[1.6] font-semibold mb-8 transition-colors duration-500"
              style={{ color: personality ? "#fbbf24" : "#60a5fa" }}
            >
              {personality ? t("personality.tagline2") : t("hero.tagline2")}
            </p>
          </AnimatedText>

          {/* Tech pills */}
          <AnimatedText delay={0.3}>
            <div className="flex flex-wrap gap-2 mb-7">
              {["React", "Node.js", "Figma", "Python", "OutSystems"].map(tech => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-[5px] px-3 py-[5px] rounded-lg text-xs font-medium font-mono bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:bg-white/[0.08] hover:text-gray-200 transition-all cursor-default"
                >
                  <span className="text-[11px]">{techIcons[tech]}</span> {tech}
                </span>
              ))}
            </div>
          </AnimatedText>

          {/* Socials + CTA */}
          <AnimatedText delay={0.4}>
            <div className="flex items-center gap-3">
              <SocialIcon href="https://www.linkedin.com/in/joaopmgraca/" label="Li" />
              <SocialIcon href="https://github.com/greengraca" label="Gh" />
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-white text-sm font-semibold font-body no-underline transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: personality
                    ? "linear-gradient(135deg, #f59e0b, #ef4444)"
                    : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  boxShadow: "0 4px 20px rgba(59,130,246,0.3)",
                }}
              >
                {personality ? t("personality.scrollCta") : t("hero.scrollCta")} ↓
              </a>
            </div>
          </AnimatedText>
        </div>

        {/* Profile photo */}
        <div className="hero-photo">
          <AnimatedText delay={0.2}>
            <div className="relative">
              <div
                className="w-[280px] h-[340px] rounded-3xl overflow-hidden transition-transform duration-600"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
                  transform: personality ? "rotate(3deg)" : "none",
                }}
              >
                <img
                  src="/profile.jpg"
                  alt="João Graça"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none"
                    e.target.parentElement.style.background = "linear-gradient(135deg, #1e293b, #334155)"
                  }}
                />
              </div>
              {/* Decorative corner */}
              <div
                className="absolute -top-3 -right-3 w-20 h-20 rounded-2xl transition-all duration-500"
                style={{
                  border: `2px solid ${personality ? "rgba(245,158,11,0.3)" : "rgba(59,130,246,0.2)"}`,
                  transform: personality ? "rotate(12deg)" : "rotate(6deg)",
                }}
              />
              <div
                className="absolute -bottom-2 -left-2 w-[60px] h-[60px] rounded-xl transition-all duration-500"
                style={{
                  background: personality ? "rgba(245,158,11,0.06)" : "rgba(139,92,246,0.06)",
                  border: `1px solid ${personality ? "rgba(245,158,11,0.15)" : "rgba(139,92,246,0.1)"}`,
                  transform: personality ? "rotate(-8deg)" : "rotate(-3deg)",
                }}
              />
              {personality && (
                <div className="absolute -top-5 left-5 text-[28px] animate-float">🐸</div>
              )}
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}

function SocialIcon({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-[10px] flex items-center justify-center border border-white/10 text-gray-400 no-underline text-[13px] font-bold font-mono hover:bg-white/[0.06] hover:text-gray-200 hover:-translate-y-0.5 transition-all"
    >
      {label}
    </a>
  )
}
