import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useI18n } from "../i18n/I18nProvider"

export default function LanguageToggle({ small = false }) {
  const { lang, setLang } = useI18n()

  const toggle = () => setLang(lang === "en" ? "pt" : "en")

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
      aria-label={lang === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
      title={lang === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
    >
      <HiOutlineGlobeAlt className={small ? "w-3.5 h-3.5" : "w-4 h-4"} />
      {lang === "en" ? "EN" : "PT"}
    </button>
  )
}
