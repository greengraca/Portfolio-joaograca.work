import { useI18n } from "../i18n/I18nProvider";

export default function Contact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="max-w-3xl mx-auto text-center py-12 md:py-16 px-4 sm:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t("sections.contact_title")}</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6 md:mb-2">
        {t("sections.contact_line_1")}
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-6 md:mb-10">
        {t("sections.contact_line_2")}
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <a href="mailto:jopegraca@gmail.com"
          className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-200 dark:border-brand-border text-gray-700 dark:text-gray-300 font-medium transition hover:bg-gray-100 dark:hover:bg-brand-hover-subtle dark:hover:text-white">
          📧 jopegraca@gmail.com
        </a>
        <a href="https://www.linkedin.com/in/joaopmgraca/" target="_blank" rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 rounded-lg border border-gray-200 dark:border-brand-border text-gray-700 dark:text-gray-300 font-medium transition hover:bg-gray-100 dark:hover:bg-brand-hover-subtle dark:hover:text-white">
          💼 {t("common.linkedin")}
        </a>
      </div>
    </section>
  )
}
