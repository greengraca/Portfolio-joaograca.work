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
    const dark = stored ? stored === "dark" : true
    setIsDark(dark)
    document.documentElement.classList.toggle("dark", dark)
    document.documentElement.style.colorScheme = dark ? "dark" : "light"
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    document.documentElement.style.colorScheme = next ? "dark" : "light"
    localStorage.setItem("theme", next ? "dark" : "light")
  }

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
          ? `var(--header-bg-solid)`
          : "transparent",
        backdropFilter: solid ? "blur(20px) saturate(1.8)" : "none",
        borderBottom: solid ? `1px solid var(--border)` : "1px solid transparent",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo with favicon */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-[10px] overflow-hidden flex items-center justify-center transition-all duration-500 shrink-0"
            style={{
              transform: personality ? "rotate(-5deg)" : "none",
              boxShadow: personality ? "0 0 12px rgba(245,158,11,0.3)" : "none",
            }}
          >
            <img src="/favicon-64x64.png" alt="JG" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-[15px] font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
              João Graça
            </div>
            <div className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>
              {personality ? t("personality.subtitle") : "Full-Stack Developer & Designer"}
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavBtn href="#projects">{t("common.projects")}</NavBtn>
          <NavBtn href="#contact">{t("common.contact")}</NavBtn>
          <a href="/JoaoGraca-CV.pdf" target="_blank" rel="noopener noreferrer"
            className="nav-btn px-3 py-1.5 rounded-lg text-[13px] font-semibold font-mono">CV</a>
          <div className="w-px h-5 mx-1" style={{ background: "var(--border)" }} />
          <SmallBtn onClick={() => setLang(lang === "en" ? "pt" : "en")}>
            {lang === "en" ? "EN" : "PT"}
          </SmallBtn>
          <SmallBtn onClick={toggleTheme}>
            {isDark ? "🌙" : "☀️"}
          </SmallBtn>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={(e) => { e.stopPropagation(); setMobileOpen(v => !v) }}
            className="p-2 rounded-lg border transition cursor-pointer"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
            aria-label="Menu"
          >
            <span className="block w-5 h-[2px] bg-current rounded" />
            <span className={`block w-5 h-[2px] bg-current rounded my-1 transition ${mobileOpen ? "opacity-0" : ""}`} />
            <span className="block w-5 h-[2px] bg-current rounded" />
          </button>

          {mobileOpen && (
            <div className="mobile-menu absolute right-0 top-full mt-2 z-50 rounded-xl shadow-2xl overflow-hidden min-w-[180px] animate-slide-up">
              <a href="#projects" onClick={() => setMobileOpen(false)} className="mobile-menu-item block px-5 py-3 text-sm">{t("common.projects")}</a>
              <a href="#contact" onClick={() => setMobileOpen(false)} className="mobile-menu-item block px-5 py-3 text-sm border-t-item">{t("common.contact")}</a>
              <a href="/JoaoGraca-CV.pdf" target="_blank" rel="noopener noreferrer" className="mobile-menu-item block px-5 py-3 text-sm border-t-item">CV</a>
              <div className="flex items-center justify-center gap-2 px-4 py-3 border-t-item">
                <SmallBtn onClick={() => { setLang(lang === "en" ? "pt" : "en"); setMobileOpen(false) }}>
                  {lang === "en" ? "EN" : "PT"}
                </SmallBtn>
                <SmallBtn onClick={() => { toggleTheme(); setMobileOpen(false) }}>
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

function NavBtn({ href, children }) {
  return (
    <a href={href} className="nav-btn px-3 py-1.5 rounded-lg text-[13px] font-medium font-body no-underline">
      {children}
    </a>
  )
}

function SmallBtn({ onClick, children }) {
  return (
    <button onClick={onClick}
      className="nav-btn px-2.5 py-1.5 rounded-lg text-[13px] font-semibold font-mono border-none bg-transparent cursor-pointer">
      {children}
    </button>
  )
}
