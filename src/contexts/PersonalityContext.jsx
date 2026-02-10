import { createContext, useContext, useState, useMemo, useEffect } from "react"

const PersonalityCtx = createContext(null)

export function PersonalityProvider({ children }) {
  const [personality, setPersonality] = useState(false)

  useEffect(() => {
    if (personality) {
      document.documentElement.classList.add("personality-active")
    } else {
      document.documentElement.classList.remove("personality-active")
    }
  }, [personality])

  const value = useMemo(() => ({ personality, setPersonality }), [personality])

  return <PersonalityCtx.Provider value={value}>{children}</PersonalityCtx.Provider>
}

export function usePersonality() {
  const ctx = useContext(PersonalityCtx)
  if (!ctx) throw new Error("usePersonality must be inside PersonalityProvider")
  return ctx
}
