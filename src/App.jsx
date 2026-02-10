import Header from "./components/Header"
import Hero from "./components/Hero"
import ProjectList from "./components/ProjectList"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import PersonalityPopup from "./components/PersonalityPopup"
import PersonalityBackground from "./components/PersonalityBackground"
import { PersonalityProvider } from "./contexts/PersonalityContext"
import { injectSpeedInsights } from '@vercel/speed-insights'

export default function App() {
  injectSpeedInsights()

  return (
    <PersonalityProvider>
      <div className="min-h-screen relative" style={{ background: "var(--bg-primary)", transition: "background 0.4s ease" }}>
        <div className="noise-overlay" />
        <PersonalityBackground />

        <div className="relative z-[1]">
          <Header />
          <main>
            <Hero />
            <ProjectList />
            <Contact />
          </main>
          <Footer />
        </div>

        <PersonalityPopup />
      </div>
    </PersonalityProvider>
  )
}
