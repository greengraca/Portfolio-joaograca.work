import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from ".";

const I18nCtx = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en"); // default EN

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    const initial = stored === "pt" ? "pt" : "en";
    setLang(initial);
    document.documentElement.lang = initial === "pt" ? "pt-PT" : "en";
  }, []);

  const t = useMemo(() => {
    const dict = translations[lang] || translations.en;
    // dot-path helper: t('hero.title')
    return (path) => {
      return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), dict) ?? path;
    };
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t }),
    [lang, t]
  );

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
