"use client"

import Image from "next/image"
import { useI18n } from "@/lib/i18n"

export function Footer() {
  const { t } = useI18n()

  const footerLinks = [
    {
      title: t("footer.product"),
      links: [
        { label: t("footer.features"), href: "#fonctionnalites" },
        { label: t("footer.apiLink"), href: "#api" },
        { label: t("footer.pricingLink"), href: "#tarifs" },
        { label: t("footer.changelog"), href: "#" },
      ],
    },
    {
      title: t("footer.solutions"),
      links: [
        { label: t("footer.businesses"), href: "#ecosysteme" },
        { label: t("footer.municipalities"), href: "#ecosysteme" },
        { label: t("footer.communities"), href: "#ecosysteme" },
        { label: t("footer.education"), href: "#" },
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        { label: t("footer.docs"), href: "#" },
        { label: t("footer.tutorials"), href: "#" },
        { label: t("footer.blog"), href: "#" },
        { label: t("footer.support"), href: "#" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.about"), href: "#" },
        { label: t("footer.careers"), href: "#" },
        { label: t("footer.contact"), href: "#" },
        { label: t("footer.legal"), href: "#" },
      ],
    },
  ]

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="KartoMap logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="font-heading text-lg font-bold text-foreground">
                kartoMap
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.description")}
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-foreground">{group.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {`\u00A9 ${t("footer.copyright")}`}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t("footer.terms")}
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t("footer.cookies")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
