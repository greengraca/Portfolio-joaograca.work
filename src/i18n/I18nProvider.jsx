import { createContext, useContext, useEffect, useMemo, useState } from "react"
import en from "./en.json"
import pt from "./pt.json"

const dicts = { en, pt }
const I18nCtx = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en")

  // init from storage once
  useEffect(() => {
    const stored = localStorage.getItem("lang")
    setLang(stored === "pt" ? "pt" : "en")
  }, [])

  // persist + set <html lang> on change
  useEffect(() => {
    localStorage.setItem("lang", lang)
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en"
  }, [lang])

  const t = useMemo(() => {
    const dict = dicts[lang] || dicts.en
    return (path) => path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : null), dict) ?? path
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t])

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nCtx)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
