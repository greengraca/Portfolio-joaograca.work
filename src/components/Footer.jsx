import { useI18n } from "../i18n/I18nProvider"
import { usePersonality } from "../contexts/PersonalityContext"

export default function Footer() {
  const { t } = useI18n()
  const { personality } = usePersonality()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.04] py-7 px-6 text-center font-body">
      <p className="text-[13px] text-gray-600">
        © {year} João Graça · {t("common.allRights")}
      </p>
      {personality && (
        <p className="text-xs text-gray-700 mt-1.5 italic">
          {t("common.madeWith")} React, Claude, {t("common.and")} {t("common.coffee")} ☕
        </p>
      )}
    </footer>
  )
}
