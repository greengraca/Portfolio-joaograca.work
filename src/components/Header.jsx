import { useState, useRef, useEffect } from "react"
import { useI18n } from "../i18n/I18nProvider"
import { usePersonality } from "../contexts/PersonalityContext"
import useScrollY from "../hooks/useScrollY"

export default function Header() {
  const { t, lang, setLang } = useI18n()
  const { personality } = usePersonality()
  const [isDark, setIsDark] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollY = useScrollY()
  const solid = scrollY > 20
  const menuRef = useRef(null)

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    setIsDark(stored ? stored === "dark" : true)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    document.documentElement.style.colorScheme = next ? "dark" : "light"
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  // close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return
    const h = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMobileOpen(false) }
    window.addEventListener("click", h)
    return () => window.removeEventListener("click", h)
  }, [mobileOpen])

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-400"
      style={{
        background: solid
          ? (isDark ? "rgba(10, 15, 20, 0.85)" : "rgba(255,255,255,0.85)")
          : "transparent",
        backdropFilter: solid ? "blur(20px) saturate(1.8)" : "none",
        borderBottom: solid
          ? `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`
          : "1px solid transparent",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo / name */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-display text-base font-bold transition-all duration-500"
            style={{
              background: personality
                ? "linear-gradient(135deg, #f59e0b, #ef4444)"
                : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              transform: personality ? "rotate(-5deg)" : "none",
            }}
          >
            {personality ? "🐸" : "JG"}
          </div>
          <div>
            <div className="text-[15px] font-bold text-gray-100 leading-tight">
              João Graça
            </div>
            <div className="text-[11px] text-gray-500 font-medium">
              {personality ? t("personality.subtitle") : "Full-Stack Developer & Designer"}
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavBtn href="#projects" isDark={isDark}>{t("common.projects")}</NavBtn>
          <NavBtn href="#contact" isDark={isDark}>{t("common.contact")}</NavBtn>
          <a
            href="/JoaoGraca-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg text-[13px] font-semibold font-mono text-gray-400 hover:text-gray-100 hover:bg-white/[0.06] transition-all"
          >
            CV
          </a>
          <div className="w-px h-5 bg-white/10 mx-1" />
          <SmallBtn onClick={() => setLang(lang === "en" ? "pt" : "en")} isDark={isDark}>
            {lang === "en" ? "EN" : "PT"}
          </SmallBtn>
          <SmallBtn onClick={toggleTheme} isDark={isDark}>
            {isDark ? "🌙" : "☀️"}
          </SmallBtn>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={(e) => { e.stopPropagation(); setMobileOpen(v => !v) }}
            className="p-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/[0.06] transition cursor-pointer"
            aria-label="Menu"
          >
            <span className="block w-5 h-[2px] bg-current rounded" />
            <span className={`block w-5 h-[2px] bg-current rounded my-1 transition ${mobileOpen ? "opacity-0" : ""}`} />
            <span className="block w-5 h-[2px] bg-current rounded" />
          </button>

          {mobileOpen && (
            <div className="absolute right-0 top-full mt-2 z-50 rounded-xl border border-white/10 bg-[#0f1419]/95 backdrop-blur-xl shadow-2xl overflow-hidden min-w-[180px] animate-slide-up">
              <a href="#projects" onClick={() => setMobileOpen(false)}
                className="block px-5 py-3 text-sm text-gray-200 hover:bg-white/[0.06] transition">{t("common.projects")}</a>
              <a href="#contact" onClick={() => setMobileOpen(false)}
                className="block px-5 py-3 text-sm text-gray-200 hover:bg-white/[0.06] transition border-t border-white/[0.04]">{t("common.contact")}</a>
              <a href="/JoaoGraca-CV.pdf" target="_blank" rel="noopener noreferrer"
                className="block px-5 py-3 text-sm text-gray-200 hover:bg-white/[0.06] transition border-t border-white/[0.04]">CV</a>
              <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-white/[0.04]">
                <SmallBtn onClick={() => setLang(lang === "en" ? "pt" : "en")} isDark={isDark}>
                  {lang === "en" ? "EN" : "PT"}
                </SmallBtn>
                <SmallBtn onClick={toggleTheme} isDark={isDark}>
                  {isDark ? "🌙" : "☀️"}
                </SmallBtn>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function NavBtn({ href, children, isDark }) {
  return (
    <a
      href={href}
      className="px-3 py-1.5 rounded-lg text-[13px] font-medium font-body text-gray-400 hover:text-gray-100 hover:bg-white/[0.06] transition-all"
    >
      {children}
    </a>
  )
}

function SmallBtn({ onClick, children, isDark }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1.5 rounded-lg text-[13px] font-semibold font-mono text-gray-400 hover:text-gray-100 hover:bg-white/[0.08] transition-all border-none bg-transparent cursor-pointer"
    >
      {children}
    </button>
  )
}
