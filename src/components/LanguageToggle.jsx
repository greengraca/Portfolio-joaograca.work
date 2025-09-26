import { useEffect, useState } from "react"
import { HiOutlineGlobeAlt } from "react-icons/hi"

export default function LanguageToggle({ small = false }) {
  const [lang, setLang] = useState("en") // default EN

  useEffect(() => {
    const stored = localStorage.getItem("lang")
    const initial = stored === "pt" ? "pt" : "en"
    setLang(initial)
    document.documentElement.lang = initial === "pt" ? "pt-PT" : "en"
  }, [])

  const toggle = () => {
    const next = lang === "en" ? "pt" : "en"
    setLang(next)
    localStorage.setItem("lang", next)
    document.documentElement.lang = next === "pt" ? "pt-PT" : "en"
  }

  return (
    <button
      onClick={toggle}
      className={[
        "inline-flex items-center gap-1 rounded-lg border border-brand-border transition",
        "text-gray-700 dark:text-gray-300",
        "hover:bg-gray-100 dark:hover:bg-brand-hover-subtle dark:hover:text-white",
        "cursor-pointer",
        small ? "px-2 py-1 text-xs font-medium" : "px-3 py-2 text-sm font-medium",
      ].join(" ")}
      aria-label="Toggle language"
      title={lang === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
    >
      <HiOutlineGlobeAlt className={small ? "w-3.5 h-3.5" : "w-4 h-4"} />
      {lang === "en" ? "EN" : "PT"}
    </button>
  )
}
