import { useEffect } from "react"

export default function useReveal(selector = ".js-reveal") {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector))
    els.forEach(el => el.classList.add("reveal"))
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed")
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [selector])
}
