import { useState, useEffect } from "react"
import { useI18n } from "../i18n/I18nProvider"
import { usePersonality } from "../contexts/PersonalityContext"
import useScrollY from "../hooks/useScrollY"

export default function PersonalityPopup() {
  const { personality, setPersonality } = usePersonality()
  const { t } = useI18n()
  const scrollY = useScrollY()
  const [dismissed, setDismissed] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (scrollY > 400 && !dismissed) setShow(true)
  }, [scrollY, dismissed])

  if (!show || dismissed) return null

  return (
    <div className="fixed bottom-6 right-6 z-[90] animate-slide-in-right">
      <div
        className="rounded-2xl p-4 max-w-[280px] font-body"
        style={{
          background: personality
            ? "linear-gradient(135deg, #1a1a2e, #16213e)"
            : "linear-gradient(135deg, #1e293b, #0f172a)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[13px] text-gray-400 font-medium">
            {personality ? "🎭" : "👀"} {t("personality.popup")}
          </span>
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-500 bg-transparent border-none cursor-pointer text-base p-1 leading-none hover:text-gray-300 transition"
          >×</button>
        </div>

        <button
          onClick={() => setPersonality(!personality)}
          className="w-full py-2.5 px-4 rounded-[10px] border-none cursor-pointer text-[13px] font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 font-body tracking-wide"
          style={{
            background: personality
              ? "linear-gradient(135deg, #f59e0b, #ef4444)"
              : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
          }}
        >
          {personality ? "🎭" : "✨"} {t("personality.toggle")} {personality ? t("personality.on") : t("personality.off")}
        </button>
      </div>
    </div>
  )
}
