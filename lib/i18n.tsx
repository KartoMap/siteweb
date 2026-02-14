"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Locale = "fr" | "en"

type TranslationValue = string | string[]

type Translations = {
  [section: string]: {
    [key: string]: TranslationValue | { [nested: string]: TranslationValue }
  }
}

const translations: Record<Locale, Translations> = {
  fr: {
    nav: {
      features: "Fonctionnalites",
      ecosystem: "Ecosysteme",
      api: "API",
      pricing: "Tarifs",
      login: "Se connecter",
      cta: "Essayer gratuitement",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
    },
    hero: {
      badge: "Plateforme cartographique no-code",
      titleStart: "Visualisez vos donnees",
      titleHighlight: "sur une carte",
      titleEnd: "interactive",
      subtitle: "Connectez vos applications, collectez des donnees et visualisez-les instantanement. Sans competence technique ni cartographique.",
      pillLayers: "Couches multiples",
      pillApi: "APIs ouvertes",
      pillCollab: "Collaboratif",
      ctaPrimary: "Commencer gratuitement",
      ctaSecondary: "Voir la demo",
      trustOrgs: "organisations",
      scrollHint: "Explorer",
      clickHint: "Cliquez sur la carte 3D",
    },
    stats: {
      orgs: "Organisations",
      dataPoints: "Points de donnees",
      connectors: "Connecteurs API",
      uptime: "Disponibilite",
    },
    features: {
      label: "Fonctionnalites",
      title: "Tout ce dont vous avez besoin pour cartographier vos donnees",
      subtitle: "Pas besoin de competences techniques ou cartographiques. KartoMap rend la visualisation de donnees accessible a tous.",
      layers: {
        title: "Gestion des couches",
        desc: "Ajoutez, superposez et organisez vos couches de donnees pour creer des cartes riches et informatives.",
      },
      basemaps: {
        title: "Fonds de carte personnalises",
        desc: "Changez de fond de carte en un clic ou creez votre propre fond de carte adapte a vos besoins.",
      },
      tables: {
        title: "Tables de donnees",
        desc: "Creez des tables structurees avec vos donnees pour que tout le monde puisse y acceder et les consulter.",
      },
      customize: {
        title: "Personnalisation complete",
        desc: "Personnalisez chaque aspect de votre carte : couleurs, icones, styles, legendes et bien plus encore.",
      },
      collaborative: {
        title: "Collecte collaborative",
        desc: "Impliquez vos citoyens et entreprises dans la creation de donnees grace a des formulaires simples.",
      },
      rights: {
        title: "Gestion des droits",
        desc: "Controlez finement qui peut voir, editer ou administrer chaque element de votre ecosysteme.",
      },
    },
    howItWorks: {
      label: "Comment ca marche",
      title: "Trois etapes pour cartographier vos donnees",
      step1: {
        title: "Connectez vos sources",
        desc: "Importez vos donnees depuis vos applications existantes grace a nos API ouvertes ou nos connecteurs natifs. CSV, GeoJSON, bases de donnees, tout est possible.",
      },
      step2: {
        title: "Visualisez sur la carte",
        desc: "Vos donnees apparaissent automatiquement sur la carte. Ajoutez des couches, personnalisez le style et choisissez votre fond de carte ideal.",
      },
      step3: {
        title: "Collaborez et partagez",
        desc: "Invitez vos equipes, definissez les droits d'acces et partagez vos cartes avec le monde entier. Chaque acteur a le bon niveau de visibilite.",
      },
    },
    ecosystem: {
      label: "Ecosysteme",
      title: "Un ecosysteme pour tous les acteurs de votre territoire",
      subtitle: "Connectez entreprises, citoyens et communautes autour de la donnee geographique avec des outils adaptes a chacun.",
      learnMore: "En savoir plus",
      businesses: {
        title: "Entreprises",
        desc: "Collectez et visualisez les donnees de vos equipes terrain, suivez vos actifs et optimisez vos operations grace a des cartes interactives.",
        items: ["Suivi des actifs en temps reel", "Rapports cartographiques", "Integration CRM & ERP"],
      },
      citizens: {
        title: "Citoyens",
        desc: "Participez a la creation de donnees pour votre communaute. Signalez, contribuez et consultez les informations de votre territoire.",
        items: ["Signalements participatifs", "Consultations publiques", "Donnees ouvertes"],
      },
      communities: {
        title: "Communautes",
        desc: "Federez vos membres autour de projets cartographiques collaboratifs. Partagez des donnees et prenez des decisions eclairees.",
        items: ["Projets collaboratifs", "Tableaux de bord partages", "Gestion des membres"],
      },
    },
    api: {
      label: "API ouvertes",
      title: "Connectez tout votre ecosysteme de donnees",
      subtitle: "Des API ouvertes pour importer, transformer et exporter vos donnees geographiques en toute simplicite.",
      input: {
        title: "API d'entree",
        desc: "Connectez vos applications de donnees existantes a KartoMap grace a nos API ouvertes. Importez facilement depuis n'importe quelle source.",
      },
      connectors: {
        title: "Connecteurs natifs",
        desc: "Profitez de nos connecteurs pre-configures pour les outils les plus populaires. Integrez en quelques clics sans aucun code.",
      },
      output: {
        title: "API de sortie",
        desc: "Exportez vos donnees cartographiques vers d'autres applications. Alimentez vos tableaux de bord et vos rapports automatiquement.",
      },
      codeComment: "// Importer des donnees dans KartoMap",
      codeName: "\"Mes points d'interet\"",
    },
    pricing: {
      label: "Tarifs",
      title: "Un plan adapte a chaque besoin",
      subtitle: "Commencez gratuitement et evoluez au rythme de vos projets cartographiques.",
      popular: "Populaire",
      discovery: {
        name: "Decouverte",
        price: "Gratuit",
        desc: "Pour explorer KartoMap et creer vos premieres cartes.",
        features: ["1 carte interactive", "3 couches de donnees", "100 points de donnees", "Fonds de carte standards", "Export PNG"],
        cta: "Commencer gratuitement",
      },
      pro: {
        name: "Professionnel",
        price: "49",
        priceDetail: "/mois",
        desc: "Pour les equipes et organisations qui veulent aller plus loin.",
        features: ["Cartes illimitees", "Couches illimitees", "50 000 points de donnees", "API entree & sortie", "Fonds de carte personnalises", "Gestion des utilisateurs", "Support prioritaire"],
        cta: "Essai gratuit 14 jours",
      },
      enterprise: {
        name: "Entreprise",
        price: "Sur mesure",
        desc: "Pour les grandes organisations avec des besoins specifiques.",
        features: ["Tout le plan Professionnel", "Points de donnees illimites", "SSO & SAML", "SLA garanti", "Connecteurs personnalises", "Formation dediee", "Account manager"],
        cta: "Nous contacter",
      },
    },
    cta: {
      title: "Pret a cartographier vos donnees ?",
      subtitle: "Rejoignez les centaines d'organisations qui utilisent deja KartoMap pour visualiser et partager leurs donnees geographiques.",
      primary: "Commencer gratuitement",
      secondary: "Demander une demo",
    },
    footer: {
      description: "La plateforme cartographique no-code pour visualiser, partager et collaborer autour de vos donnees geographiques.",
      product: "Produit",
      solutions: "Solutions",
      resources: "Ressources",
      company: "Entreprise",
      features: "Fonctionnalites",
      apiLink: "API",
      pricingLink: "Tarifs",
      changelog: "Changelog",
      businesses: "Entreprises",
      municipalities: "Collectivites",
      communities: "Communautes",
      education: "Education",
      docs: "Documentation",
      tutorials: "Tutoriels",
      blog: "Blog",
      support: "Support",
      about: "A propos",
      careers: "Carrieres",
      contact: "Contact",
      legal: "Mentions legales",
      copyright: "2026 KartoMap. Tous droits reserves.",
      privacy: "Confidentialite",
      terms: "CGU",
      cookies: "Cookies",
    },
    map3d: {
      pin1: { label: "Mairie de Lyon", desc: "Collecte des donnees urbaines en temps reel depuis les capteurs municipaux.", value: "12,847" },
      pin2: { label: "Donnees citoyennes", desc: "Signalements et contributions des habitants via l'application mobile.", value: "3,291" },
      pin3: { label: "Station meteo", desc: "Mesures meteorologiques: temperature, humidite, pression, vent.", value: "24/7" },
      pin4: { label: "Capteur IoT", desc: "Reseau de capteurs connectes pour la qualite de l'air et le bruit.", value: "458" },
      pin5: { label: "Signalements", desc: "Points de signalement citoyens: voirie, proprete, eclairage.", value: "1,052" },
      pin6: { label: "API Transport", desc: "Donnees de mobilite en temps reel: bus, velos, trottinettes.", value: "6 APIs" },
      pin7: { label: "OpenData", desc: "Integration automatique des jeux de donnees ouverts gouvernementaux.", value: "89 jeux" },
      clickLabel: "Cliquez",
      dataLabel: "Donnees",
      badge1: "API Ouverte",
      badge2: "Couches",
      badge3: "Temps reel",
      badge4: "No-code",
      badge5: "Collaboratif",
    },
  },
  en: {
    nav: {
      features: "Features",
      ecosystem: "Ecosystem",
      api: "API",
      pricing: "Pricing",
      login: "Sign in",
      cta: "Try for free",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      badge: "No-code mapping platform",
      titleStart: "Visualize your data",
      titleHighlight: "on a map",
      titleEnd: "interactive",
      subtitle: "Connect your apps, collect data and visualize it instantly. No technical or cartographic skills required.",
      pillLayers: "Multiple layers",
      pillApi: "Open APIs",
      pillCollab: "Collaborative",
      ctaPrimary: "Get started for free",
      ctaSecondary: "Watch demo",
      trustOrgs: "organizations",
      scrollHint: "Explore",
      clickHint: "Click the 3D map",
    },
    stats: {
      orgs: "Organizations",
      dataPoints: "Data points",
      connectors: "API connectors",
      uptime: "Uptime",
    },
    features: {
      label: "Features",
      title: "Everything you need to map your data",
      subtitle: "No technical or cartographic skills needed. KartoMap makes data visualization accessible to everyone.",
      layers: {
        title: "Layer management",
        desc: "Add, overlay and organize your data layers to create rich and informative maps.",
      },
      basemaps: {
        title: "Custom basemaps",
        desc: "Switch basemaps in one click or create your own basemap tailored to your needs.",
      },
      tables: {
        title: "Data tables",
        desc: "Create structured tables with your data so everyone can access and browse them.",
      },
      customize: {
        title: "Full customization",
        desc: "Customize every aspect of your map: colors, icons, styles, legends and much more.",
      },
      collaborative: {
        title: "Collaborative collection",
        desc: "Involve your citizens and businesses in data creation through simple forms.",
      },
      rights: {
        title: "Rights management",
        desc: "Precisely control who can view, edit or manage each element of your ecosystem.",
      },
    },
    howItWorks: {
      label: "How it works",
      title: "Three steps to map your data",
      step1: {
        title: "Connect your sources",
        desc: "Import your data from existing apps through our open APIs or native connectors. CSV, GeoJSON, databases, anything goes.",
      },
      step2: {
        title: "Visualize on the map",
        desc: "Your data automatically appears on the map. Add layers, customize the style and choose your ideal basemap.",
      },
      step3: {
        title: "Collaborate and share",
        desc: "Invite your teams, define access rights and share your maps with the world. Each stakeholder gets the right level of visibility.",
      },
    },
    ecosystem: {
      label: "Ecosystem",
      title: "An ecosystem for all stakeholders in your territory",
      subtitle: "Connect businesses, citizens and communities around geographic data with tools tailored to each.",
      learnMore: "Learn more",
      businesses: {
        title: "Businesses",
        desc: "Collect and visualize data from your field teams, track assets and optimize operations with interactive maps.",
        items: ["Real-time asset tracking", "Map-based reports", "CRM & ERP integration"],
      },
      citizens: {
        title: "Citizens",
        desc: "Participate in creating data for your community. Report, contribute and consult information about your territory.",
        items: ["Participatory reporting", "Public consultations", "Open data"],
      },
      communities: {
        title: "Communities",
        desc: "Unite your members around collaborative mapping projects. Share data and make informed decisions.",
        items: ["Collaborative projects", "Shared dashboards", "Member management"],
      },
    },
    api: {
      label: "Open APIs",
      title: "Connect your entire data ecosystem",
      subtitle: "Open APIs to import, transform and export your geographic data with ease.",
      input: {
        title: "Input API",
        desc: "Connect your existing data applications to KartoMap through our open APIs. Import easily from any source.",
      },
      connectors: {
        title: "Native connectors",
        desc: "Leverage our pre-configured connectors for the most popular tools. Integrate in a few clicks, no code needed.",
      },
      output: {
        title: "Output API",
        desc: "Export your map data to other applications. Automatically feed your dashboards and reports.",
      },
      codeComment: "// Import data into KartoMap",
      codeName: "\"My points of interest\"",
    },
    pricing: {
      label: "Pricing",
      title: "A plan for every need",
      subtitle: "Start for free and scale at the pace of your mapping projects.",
      popular: "Popular",
      discovery: {
        name: "Discovery",
        price: "Free",
        desc: "To explore KartoMap and create your first maps.",
        features: ["1 interactive map", "3 data layers", "100 data points", "Standard basemaps", "PNG export"],
        cta: "Get started for free",
      },
      pro: {
        name: "Professional",
        price: "49",
        priceDetail: "/mo",
        desc: "For teams and organizations that want to go further.",
        features: ["Unlimited maps", "Unlimited layers", "50,000 data points", "Input & output APIs", "Custom basemaps", "User management", "Priority support"],
        cta: "Free 14-day trial",
      },
      enterprise: {
        name: "Enterprise",
        price: "Custom",
        desc: "For large organizations with specific needs.",
        features: ["Everything in Professional", "Unlimited data points", "SSO & SAML", "Guaranteed SLA", "Custom connectors", "Dedicated training", "Account manager"],
        cta: "Contact us",
      },
    },
    cta: {
      title: "Ready to map your data?",
      subtitle: "Join the hundreds of organizations already using KartoMap to visualize and share their geographic data.",
      primary: "Get started for free",
      secondary: "Request a demo",
    },
    footer: {
      description: "The no-code mapping platform to visualize, share and collaborate around your geographic data.",
      product: "Product",
      solutions: "Solutions",
      resources: "Resources",
      company: "Company",
      features: "Features",
      apiLink: "API",
      pricingLink: "Pricing",
      changelog: "Changelog",
      businesses: "Businesses",
      municipalities: "Municipalities",
      communities: "Communities",
      education: "Education",
      docs: "Documentation",
      tutorials: "Tutorials",
      blog: "Blog",
      support: "Support",
      about: "About",
      careers: "Careers",
      contact: "Contact",
      legal: "Legal notice",
      copyright: "2026 KartoMap. All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
    },
    map3d: {
      pin1: { label: "Lyon City Hall", desc: "Real-time urban data collection from municipal sensors.", value: "12,847" },
      pin2: { label: "Citizen data", desc: "Reports and contributions from residents via the mobile app.", value: "3,291" },
      pin3: { label: "Weather station", desc: "Meteorological measurements: temperature, humidity, pressure, wind.", value: "24/7" },
      pin4: { label: "IoT Sensor", desc: "Connected sensor network for air quality and noise.", value: "458" },
      pin5: { label: "Reports", desc: "Citizen reporting points: roads, cleanliness, lighting.", value: "1,052" },
      pin6: { label: "Transport API", desc: "Real-time mobility data: buses, bikes, scooters.", value: "6 APIs" },
      pin7: { label: "OpenData", desc: "Automatic integration of government open datasets.", value: "89 sets" },
      clickLabel: "Click",
      dataLabel: "Data",
      badge1: "Open API",
      badge2: "Layers",
      badge3: "Real-time",
      badge4: "No-code",
      badge5: "Collaborative",
    },
  },
}

type I18nContextType = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (path: string) => string
  ta: (path: string) => string[]
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr")

  const t = useCallback(
    (path: string): string => {
      const keys = path.split(".")
      let result: unknown = translations[locale]
      for (const key of keys) {
        if (result && typeof result === "object" && key in (result as Record<string, unknown>)) {
          result = (result as Record<string, unknown>)[key]
        } else {
          return path
        }
      }
      return typeof result === "string" ? result : path
    },
    [locale]
  )

  const ta = useCallback(
    (path: string): string[] => {
      const keys = path.split(".")
      let result: unknown = translations[locale]
      for (const key of keys) {
        if (result && typeof result === "object" && key in (result as Record<string, unknown>)) {
          result = (result as Record<string, unknown>)[key]
        } else {
          return []
        }
      }
      return Array.isArray(result) ? result : []
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, ta }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
