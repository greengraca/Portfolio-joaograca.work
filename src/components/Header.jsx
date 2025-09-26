import { useState, useRef, useEffect } from "react"
import ThemeToggle from "./ThemeToggle"
import LanguageToggle from "./LanguageToggle"
import { useI18n } from "../i18n/I18nProvider";


export default function Header() {
    const [open, setOpen] = useState(false)
    const btnRef = useRef(null)
    const popRef = useRef(null)
    const { t } = useI18n();


    useEffect(() => {
        if (!open) return
        const onClick = (e) => {
            if (!popRef.current || !btnRef.current) return
            if (!popRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        window.addEventListener("click", onClick)
        return () => window.removeEventListener("click", onClick)
    }, [open])

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-brand-header/90 backdrop-blur border-b border-brand-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-3 md:py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                            João Graça
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            ODC • Figma • React / Node.js • Python
                        </p>
                    </div>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#projects" className="text-sm text-gray-700 dark:text-gray-300 link-underline hover:text-brand-accent">{t("common.projects")}</a>
                        <a href="#contact" className="text-sm text-gray-700 dark:text-gray-300 link-underline hover:text-brand-accent">{t("common.contact")}</a>
                        <div className="md:flex items-center gap-2">
                            <LanguageToggle />
                            <ThemeToggle />
                        </div>
                    </nav>

                    {/* Mobile hamburger */}
                    <div className="md:hidden relative">
                        <button
                            ref={btnRef}
                            onClick={() => setOpen(v => !v)}
                            aria-expanded={open}
                            aria-label="Open menu"
                            className="p-2 rounded-lg border border-brand-border text-gray-700 dark:text-gray-300 transition hover:bg-gray-100 dark:hover:bg-brand-hover-subtle dark:hover:text-white cursor-pointer"
                        >
                            <span className="block w-5 h-[2px] bg-current rounded" />
                            <span className={`block w-5 h-[2px] bg-current rounded my-1 transition ${open ? "opacity-0" : "opacity-100"}`} />
                            <span className="block w-5 h-[2px] bg-current rounded" />
                        </button>

                        {/* Popover menu */}
                        {open && (
                            <div
                                ref={popRef}
                                role="menu"
                                className="absolute right-0 top-full mt-2 z-50
               rounded-xl border border-brand-border
               bg-white/95 dark:bg-brand-header/95
               shadow-lg overflow-hidden w-fit text-center md:hidden"
                            >
                                <a
                                    href="#projects"
                                    onClick={() => setOpen(false)}
                                    role="menuitem"
                                    className="block px-7 py-2.5 text-sm text-gray-800 dark:text-gray-200
                 hover:bg-gray-100 dark:hover:bg-brand-hover-subtle dark:hover:text-white"
                                >
                                    {t("common.projects")}
                                </a>
                                <a
                                    href="#contact"
                                    onClick={() => setOpen(false)}
                                    role="menuitem"
                                    className="block px-7 py-2.5 text-sm text-gray-800 dark:text-gray-200
                 hover:bg-gray-100 dark:hover:bg-brand-hover-subtle dark:hover:text-white
                 border-t border-brand-border/60"
                                >
                                    {t("common.contact")}
                                </a>

                                <div className="border-t border-brand-border/60 px-4 pt-3 pb-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <LanguageToggle small />
                                        <ThemeToggle small iconOnly />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
