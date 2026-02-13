import Image from "next/image"

const footerLinks = [
  {
    title: "Produit",
    links: [
      { label: "Fonctionnalites", href: "#fonctionnalites" },
      { label: "API", href: "#api" },
      { label: "Tarifs", href: "#tarifs" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Entreprises", href: "#ecosysteme" },
      { label: "Collectivites", href: "#ecosysteme" },
      { label: "Communautes", href: "#ecosysteme" },
      { label: "Education", href: "#" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Tutoriels", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "A propos", href: "#" },
      { label: "Carrieres", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Mentions legales", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
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
              La plateforme cartographique no-code pour visualiser, partager et
              collaborer autour de vos donnees geographiques.
            </p>
          </div>

          {/* Links */}
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
            {"© 2026 KartoMap. Tous droits reserves."}
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Confidentialite
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              CGU
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
