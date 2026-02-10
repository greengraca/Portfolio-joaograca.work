import { useI18n } from "../i18n/I18nProvider"
import { usePersonality } from "../contexts/PersonalityContext"

export default function Footer() {
  const { t } = useI18n()
  const { personality } = usePersonality()
  const year = new Date().getFullYear()

  return (
    <footer className="py-7 px-6 text-center font-body" style={{ borderTop: "1px solid var(--border-subtle)" }}>
      <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
        © {year} João Graça · {t("common.allRights")}
      </p>
      {personality && (
        <p className="text-xs mt-1.5 italic" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
          {t("common.madeWith")} React, Claude, {t("common.and")} {t("common.coffee")} ☕ 🍄
        </p>
      )}
    </footer>
  )
}
