"use client"

import { useI18n, type Locale } from "@/lib/i18n"

const flags: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
}

export function LanguageSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { locale, setLocale } = useI18n()
  const other: Locale = locale === "fr" ? "en" : "fr"

  return (
    <button
      onClick={() => setLocale(other)}
      className={`relative flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide transition-all hover:scale-105 active:scale-95 ${
        variant === "dark"
          ? "border-[#1e293b] bg-white/5 text-[#94a3b8] hover:bg-white/10 hover:text-white"
          : "border-border bg-secondary text-secondary-foreground hover:bg-secondary/80"
      }`}
      aria-label={locale === "fr" ? "Switch to English" : "Passer en francais"}
    >
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-[9px] font-bold text-primary">
        {flags[locale]}
      </span>
      <span className="hidden sm:inline">{locale === "fr" ? "EN" : "FR"}</span>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        className="opacity-50"
      >
        <path
          d="M3 1L7 5L3 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
