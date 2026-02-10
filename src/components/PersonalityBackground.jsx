import { usePersonality } from "../contexts/PersonalityContext"

export default function PersonalityBackground() {
  const { personality } = usePersonality()

  return (
    <div className="personality-bg-patterns">
      {/* Warm orange radial gradients */}
      <div style={{
        position: "absolute", top: "5%", right: "15%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", left: "10%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", top: "50%", right: "5%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
        filter: "blur(30px)",
      }} />

      {/* Subtle SVG pattern overlay — torii gate, mushrooms, waves */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: personality ? 0.025 : 0, transition: "opacity 1s ease" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="jp-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Mini torii gate */}
            <g transform="translate(30, 40)" fill="none" stroke="#f59e0b" strokeWidth="1.5">
              <line x1="5" y1="0" x2="5" y2="25" />
              <line x1="25" y1="0" x2="25" y2="25" />
              <line x1="0" y1="3" x2="30" y2="3" />
              <line x1="2" y1="8" x2="28" y2="8" />
            </g>
            {/* Mushroom */}
            <g transform="translate(140, 130)">
              <ellipse cx="10" cy="8" rx="12" ry="8" fill="none" stroke="#f59e0b" strokeWidth="1" />
              <line x1="10" y1="16" x2="10" y2="28" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="6" cy="5" r="1.5" fill="none" stroke="#f59e0b" strokeWidth="0.8" />
              <circle cx="14" cy="6" r="1" fill="none" stroke="#f59e0b" strokeWidth="0.8" />
            </g>
            {/* Wave (seigaiha inspired) */}
            <g transform="translate(80, 160)" fill="none" stroke="#f59e0b" strokeWidth="0.8">
              <path d="M0,10 Q10,0 20,10 Q30,20 40,10" />
              <path d="M0,15 Q10,5 20,15 Q30,25 40,15" />
            </g>
            {/* Small mushroom cluster */}
            <g transform="translate(160, 30)">
              <ellipse cx="6" cy="6" rx="7" ry="5" fill="none" stroke="#f59e0b" strokeWidth="0.8" />
              <line x1="6" y1="11" x2="6" y2="18" stroke="#f59e0b" strokeWidth="1" />
              <ellipse cx="18" cy="10" rx="5" ry="4" fill="none" stroke="#f59e0b" strokeWidth="0.8" />
              <line x1="18" y1="14" x2="18" y2="20" stroke="#f59e0b" strokeWidth="1" />
            </g>
            {/* Cherry blossom / dot pattern */}
            <circle cx="100" cy="80" r="2" fill="none" stroke="#f59e0b" strokeWidth="0.6" />
            <circle cx="105" cy="76" r="2" fill="none" stroke="#f59e0b" strokeWidth="0.6" />
            <circle cx="96" cy="77" r="2" fill="none" stroke="#f59e0b" strokeWidth="0.6" />
            <circle cx="100" cy="73" r="2" fill="none" stroke="#f59e0b" strokeWidth="0.6" />
            <circle cx="100" cy="76.5" r="1" fill="#f59e0b" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#jp-pattern)" />
      </svg>
    </div>
  )
}
