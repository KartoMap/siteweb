"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useI18n } from "@/lib/i18n"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useI18n()

  const navLinks = [
    { label: t("nav.features"), href: "#fonctionnalites" },
    { label: t("nav.ecosystem"), href: "#ecosysteme" },
    { label: t("nav.api"), href: "#api" },
    { label: t("nav.pricing"), href: "#tarifs" },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="KartoMap logo"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span
            className={`font-heading text-xl font-bold transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            kartoMap
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher variant={scrolled ? "light" : "dark"} />
          <Button
            variant="ghost"
            size="sm"
            className={
              scrolled
                ? ""
                : "text-[#94a3b8] hover:text-white hover:bg-white/10"
            }
          >
            {t("nav.login")}
          </Button>
          <Button
            size="sm"
            className="bg-[#0d9488] text-white hover:bg-[#0d9488]/90 shadow-lg shadow-[#0d9488]/20"
          >
            {t("nav.cta")}
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
        >
          {mobileOpen ? (
            <X className={`h-6 w-6 ${scrolled ? "text-foreground" : "text-white"}`} />
          ) : (
            <Menu className={`h-6 w-6 ${scrolled ? "text-foreground" : "text-white"}`} />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div
          className={`border-t px-6 pb-6 md:hidden ${
            scrolled
              ? "border-border bg-background"
              : "border-[#1e293b] bg-[#060e1b]/95 backdrop-blur-md"
          }`}
        >
          <nav className="flex flex-col gap-4 pt-4" aria-label="Navigation mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-[#94a3b8] hover:text-white"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <LanguageSwitcher variant={scrolled ? "light" : "dark"} />
            <Button variant="ghost" size="sm" className="w-full">
              {t("nav.login")}
            </Button>
            <Button
              size="sm"
              className="w-full bg-[#0d9488] text-white hover:bg-[#0d9488]/90"
            >
              {t("nav.cta")}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
