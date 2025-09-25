import { useEffect, useState } from "react"

export default function ThemeToggle({ small = false, iconOnly = false, className = "" }) {
  const [isDark, setIsDark] = useState(false) // default LIGHT

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    setIsDark(stored ? stored === "dark" : false)
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    document.documentElement.style.colorScheme = next ? "dark" : "light"
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  return (
    <button
      onClick={toggle}
      className={`rounded-lg border border-brand-border transition hover:bg-gray-100 dark:hover:bg-brand-hover-subtle dark:hover:text-white cursor-pointer
        ${small
          ? "px-2 py-1 text-xs"
          : "p-2 text-sm"
        }
        ${className}
        text-gray-700 dark:text-gray-300`}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {iconOnly ? (isDark ? "🌙" : "☀️") : (isDark ? "🌙 Dark" : "☀️ Light")}
    </button>
  )
}
