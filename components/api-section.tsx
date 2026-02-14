"use client"

import { ArrowDownToLine, ArrowUpFromLine, Plug } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function ApiSection() {
  const { t } = useI18n()

  const apiFeatures = [
    {
      icon: ArrowDownToLine,
      title: t("api.input.title"),
      description: t("api.input.desc"),
      examples: ["REST API", "Webhooks", "CSV / GeoJSON", "WMS / WFS"],
    },
    {
      icon: Plug,
      title: t("api.connectors.title"),
      description: t("api.connectors.desc"),
      examples: ["Google Sheets", "Airtable", "Notion", "PostgreSQL"],
    },
    {
      icon: ArrowUpFromLine,
      title: t("api.output.title"),
      description: t("api.output.desc"),
      examples: ["JSON / GeoJSON", "Iframe", "API REST", "Exports CSV"],
    },
  ]

  return (
    <section id="api" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("api.label")}
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            {t("api.title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t("api.subtitle")}
          </p>
        </div>

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

        {/* Code snippet */}
        <div className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-2xl border border-border bg-foreground">
          <div className="flex items-center gap-2 border-b border-border/20 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-destructive/60" />
            <span className="h-3 w-3 rounded-full bg-accent/60" />
            <span className="h-3 w-3 rounded-full bg-primary/60" />
            <span className="ml-3 text-xs text-background/60">api-example.js</span>
          </div>
          <pre className="overflow-x-auto p-5 text-sm leading-relaxed text-background/80">
            <code>{`${t("api.codeComment")}
const response = await fetch(
  "https://api.kartomap.io/v1/layers",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: ${t("api.codeName")},
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
