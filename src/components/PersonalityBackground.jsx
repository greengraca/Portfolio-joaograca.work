import { usePersonality } from "../contexts/PersonalityContext"

export default function PersonalityBackground() {
  const { personality } = usePersonality()

  return (
    <div className="personality-bg-patterns">
      {/* Warm radial glows */}
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

      {/* Angular contour lines pattern — SVG overlay */}
      <svg
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          opacity: personality ? 1 : 0,
          transition: "opacity 1s ease",
        }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Repeating angular lines pattern tile */}
          <pattern id="angular-lines" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(-25)">
            <line x1="0" y1="10" x2="120" y2="10" stroke="rgba(245,158,11,0.04)" strokeWidth="0.5" />
            <line x1="0" y1="30" x2="120" y2="30" stroke="rgba(245,158,11,0.025)" strokeWidth="0.8" />
            <line x1="0" y1="55" x2="120" y2="55" stroke="rgba(245,158,11,0.035)" strokeWidth="0.5" />
            <line x1="0" y1="75" x2="120" y2="75" stroke="rgba(245,158,11,0.02)" strokeWidth="1" />
            <line x1="0" y1="100" x2="120" y2="100" stroke="rgba(245,158,11,0.03)" strokeWidth="0.6" />
          </pattern>

          {/* Second layer — crossing diagonal lines for depth */}
          <pattern id="cross-lines" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse" patternTransform="rotate(50)">
            <line x1="0" y1="25" x2="200" y2="25" stroke="rgba(239,68,68,0.02)" strokeWidth="0.4" />
            <line x1="0" y1="70" x2="200" y2="70" stroke="rgba(245,158,11,0.025)" strokeWidth="0.6" />
            <line x1="0" y1="130" x2="200" y2="130" stroke="rgba(239,68,68,0.015)" strokeWidth="0.5" />
            <line x1="0" y1="175" x2="200" y2="175" stroke="rgba(245,158,11,0.02)" strokeWidth="0.4" />
          </pattern>

          {/* Radial fade mask so lines are strongest in center/corners */}
          <radialGradient id="fade-mask" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </radialGradient>
          <mask id="line-mask">
            <rect width="100%" height="100%" fill="url(#fade-mask)" />
          </mask>
        </defs>

        {/* Primary angular lines */}
        <rect width="100%" height="100%" fill="url(#angular-lines)" mask="url(#line-mask)" />
        {/* Crossing lines for moiré-like depth */}
        <rect width="100%" height="100%" fill="url(#cross-lines)" />
      </svg>
    </div>
  )
}
