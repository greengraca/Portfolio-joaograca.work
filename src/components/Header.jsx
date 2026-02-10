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
        background: solid ? "var(--header-bg-solid)" : "transparent",
        backdropFilter: solid ? "blur(20px) saturate(1.8)" : "none",
        borderBottom: solid ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[10px] overflow-hidden shrink-0 transition-all duration-500"
            style={{ transform: personality ? "rotate(-5deg)" : "none", boxShadow: personality ? "0 0 12px rgba(245,158,11,0.3)" : "none" }}>
            <img src="/favicon-64x64.png" alt="JG" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-[15px] font-bold leading-tight" style={{ color: "var(--text-primary)" }}>João Graça</div>
            <div className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>
              {personality ? t("personality.subtitle") : "Full-Stack Developer & Designer"}
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="#projects">{t("common.projects")}</NavLink>
          <NavLink href="#contact">{t("common.contact")}</NavLink>
          <a href="/JoaoGraca-CV.pdf" target="_blank" rel="noopener noreferrer" className="nav-btn px-3 py-1.5 rounded-lg text-[13px] font-semibold font-mono">CV</a>
          <div className="w-px h-5 mx-1" style={{ background: "var(--border)" }} />
          <SmallBtn onClick={() => setLang(lang === "en" ? "pt" : "en")}>{lang === "en" ? "EN" : "PT"}</SmallBtn>
          <SmallBtn onClick={toggleTheme}>{isDark ? "🌙" : "☀️"}</SmallBtn>
        </nav>

        {/* Mobile menu button — pill style */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={(e) => { e.stopPropagation(); setMobileOpen(v => !v) }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 cursor-pointer"
            style={{
              background: mobileOpen ? "var(--nav-hover-bg)" : "transparent",
              border: `1px solid ${mobileOpen ? "var(--border-hover)" : "var(--border)"}`,
            }}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-[3px] w-4">
              <span className="block h-[1.5px] rounded-full transition-all duration-300"
                style={{
                  background: "var(--nav-text)",
                  width: mobileOpen ? "100%" : "100%",
                  transform: mobileOpen ? "rotate(45deg) translate(2px, 2px)" : "none",
                }} />
              <span className="block h-[1.5px] rounded-full transition-all duration-300"
                style={{
                  background: "var(--nav-text)",
                  opacity: mobileOpen ? 0 : 1,
                  width: "70%",
                }} />
              <span className="block h-[1.5px] rounded-full transition-all duration-300"
                style={{
                  background: "var(--nav-text)",
                  width: mobileOpen ? "100%" : "50%",
                  transform: mobileOpen ? "rotate(-45deg) translate(2px, -2px)" : "none",
                }} />
            </div>
            <span className="text-[12px] font-semibold font-mono" style={{ color: "var(--nav-text)" }}>
              {mobileOpen ? "✕" : "Menu"}
            </span>
          </button>

          {mobileOpen && (
            <div className="mobile-menu absolute right-0 top-full mt-2 z-50 rounded-2xl shadow-2xl overflow-hidden min-w-[200px] animate-slide-up">
              <div className="p-2">
                <MobileLink href="#projects" onClick={() => setMobileOpen(false)}>{t("common.projects")}</MobileLink>
                <MobileLink href="#contact" onClick={() => setMobileOpen(false)}>{t("common.contact")}</MobileLink>
                <a href="/JoaoGraca-CV.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-[13px] font-medium no-underline transition-all"
                  style={{ color: "var(--nav-text)" }}>CV ↗</a>
              </div>
              <div className="mx-2 my-1 h-px" style={{ background: "var(--border-subtle)" }} />
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <SmallBtn onClick={() => { setLang(lang === "en" ? "pt" : "en"); setMobileOpen(false) }}>
                    {lang === "en" ? "🇬🇧 EN" : "🇵🇹 PT"}
                  </SmallBtn>
                </div>
                <SmallBtn onClick={() => { toggleTheme(); setMobileOpen(false) }}>
                  {isDark ? "🌙 Dark" : "☀️ Light"}
                </SmallBtn>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, children }) {
  return <a href={href} className="nav-btn px-3 py-1.5 rounded-lg text-[13px] font-medium font-body no-underline">{children}</a>
}
function MobileLink({ href, onClick, children }) {
  return <a href={href} onClick={onClick} className="block px-4 py-2.5 rounded-xl text-[13px] font-medium no-underline transition-all" style={{ color: "var(--nav-text)" }}>{children}</a>
}
function SmallBtn({ onClick, children }) {
  return <button onClick={onClick} className="nav-btn px-2.5 py-1.5 rounded-lg text-[12px] font-semibold font-mono border-none bg-transparent cursor-pointer">{children}</button>
}
