import { useI18n } from "../i18n/I18nProvider"
import { usePersonality } from "../contexts/PersonalityContext"
import AnimatedText from "./AnimatedText"

export default function Contact() {
  const { t } = useI18n()
  const { personality } = usePersonality()

  return (
    <section id="contact" className="px-6 pt-20 pb-16 max-w-[1100px] mx-auto">
      <AnimatedText>
        <div className="text-center max-w-[560px] mx-auto">
          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-normal text-gray-100 mb-4 italic">
            {personality ? t("sections.contact_titlePersonality") : t("sections.contact_title")}
          </h2>
          <p className="font-body text-[15px] text-gray-400 leading-[1.7] mb-1.5">
            {personality ? t("sections.contact_line_1Personality") : t("sections.contact_line_1")}
          </p>
          <p className="font-body text-[15px] text-gray-400 leading-[1.7] mb-9">
            {personality ? t("sections.contact_line_2Personality") : t("sections.contact_line_2")}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <ContactLink href="mailto:jopegraca@gmail.com" icon="📧" label="jopegraca@gmail.com" />
            <ContactLink href="https://www.linkedin.com/in/joaopmgraca/" icon="💼" label="LinkedIn" external />
            <ContactLink href="tel:+351913574872" icon="📱" label="+351 913574872" />
          </div>
        </div>
      </AnimatedText>
    </section>
  )
}

function ContactLink({ href, icon, label, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-gray-300 text-sm font-medium font-body no-underline hover:bg-white/[0.06] hover:border-white/15 hover:-translate-y-0.5 transition-all"
    >
      <span>{icon}</span> {label}
    </a>
  )
}
