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
          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-normal mb-4 italic" style={{ color: "var(--text-primary)" }}>
            {personality ? t("sections.contact_titlePersonality") : t("sections.contact_title")}
          </h2>
          <p className="font-body text-[15px] leading-[1.7] mb-1.5" style={{ color: "var(--text-secondary)" }}>
            {personality ? t("sections.contact_line_1Personality") : t("sections.contact_line_1")}
          </p>
          <p className="font-body text-[15px] leading-[1.7] mb-9" style={{ color: "var(--text-secondary)" }}>
            {personality ? t("sections.contact_line_2Personality") : t("sections.contact_line_2")}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ContactLink href="mailto:jopegraca@gmail.com" icon="📧" label="jopegraca@gmail.com" personality={personality} />
            <ContactLink href="https://www.linkedin.com/in/joaopmgraca/" icon="💼" label="LinkedIn" external personality={personality} />
            <ContactLink href="tel:+351913574872" icon="📱" label="+351 913574872" personality={personality} />
          </div>
        </div>
      </AnimatedText>
    </section>
  )
}

function ContactLink({ href, icon, label, external = false, personality }) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium font-body no-underline transition-all duration-300 hover:-translate-y-0.5 ${personality ? "tech-pill" : ""}`}
      style={{
        border: `1px solid ${personality ? "rgba(245,158,11,0.15)" : "var(--border)"}`,
        background: "var(--bg-card)",
        color: "var(--text-tertiary)",
      }}>
      <span>{icon}</span> {label}
    </a>
  )
}
