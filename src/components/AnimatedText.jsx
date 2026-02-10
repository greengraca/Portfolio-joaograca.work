import useScrollReveal from "../hooks/useScrollReveal"

export default function AnimatedText({ children, delay = 0, className = "" }) {
  const [ref, vis] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
