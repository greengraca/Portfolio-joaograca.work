import Header from "./components/Header"
import Hero from "./components/Hero"
import ProjectList from "./components/ProjectList"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import { injectSpeedInsights } from '@vercel/speed-insights';


export default function App() {
  injectSpeedInsights();

  if (!document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.add('dark')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-brand-bg text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto px-8 pt-10 md:pt-20">
        <Hero />
        <ProjectList />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
