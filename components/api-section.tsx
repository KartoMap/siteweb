import { ArrowDownToLine, ArrowUpFromLine, Plug } from "lucide-react"

const apiFeatures = [
  {
    icon: ArrowDownToLine,
    title: "API d'entree",
    description:
      "Connectez vos applications de donnees existantes a KartoMap grace a nos API ouvertes. Importez facilement depuis n'importe quelle source.",
    examples: ["REST API", "Webhooks", "CSV / GeoJSON", "WMS / WFS"],
  },
  {
    icon: Plug,
    title: "Connecteurs natifs",
    description:
      "Profitez de nos connecteurs pre-configures pour les outils les plus populaires. Integrez en quelques clics sans aucun code.",
    examples: ["Google Sheets", "Airtable", "Notion", "PostgreSQL"],
  },
  {
    icon: ArrowUpFromLine,
    title: "API de sortie",
    description:
      "Exportez vos donnees cartographiques vers d'autres applications. Alimentez vos tableaux de bord et vos rapports automatiquement.",
    examples: ["JSON / GeoJSON", "Iframe", "API REST", "Exports CSV"],
  },
]

export function ApiSection() {
  return (
    <section id="api" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            API ouvertes
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Connectez tout votre ecosysteme de donnees
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Des API ouvertes pour importer, transformer et exporter vos donnees
            geographiques en toute simplicite.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {apiFeatures.map((feature, index) => (
            <div key={feature.title} className="relative">
              {index < apiFeatures.length - 1 && (
                <div className="absolute -right-4 top-1/2 z-10 hidden h-px w-8 bg-border lg:block" />
              )}
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {feature.examples.map((ex) => (
                    <span
                      key={ex}
                      className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Code snippet preview */}
        <div className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-2xl border border-border bg-foreground">
          <div className="flex items-center gap-2 border-b border-border/20 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-destructive/60" />
            <span className="h-3 w-3 rounded-full bg-accent/60" />
            <span className="h-3 w-3 rounded-full bg-primary/60" />
            <span className="ml-3 text-xs text-background/60">api-example.js</span>
          </div>
          <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-background/80">
            <code>{`// Importer des donnees dans KartoMap
const response = await fetch(
  "https://api.kartomap.io/v1/layers",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "Mes points d'interet",
      type: "geojson",
      data: myGeoJsonData
    })
  }
);`}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}
