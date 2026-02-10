import Header from "./components/Header"
import Hero from "./components/Hero"
import ProjectList from "./components/ProjectList"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import PersonalityPopup from "./components/PersonalityPopup"
import { PersonalityProvider } from "./contexts/PersonalityContext"
import { injectSpeedInsights } from '@vercel/speed-insights'

export default function App() {
  injectSpeedInsights()

  return (
    <PersonalityProvider>
      <div className="min-h-screen relative" style={{ background: "#0a0f14" }}>
        {/* Subtle noise texture */}
        <div className="noise-overlay" />

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
