"use client"

import {
  Layers,
  Map,
  Table2,
  Paintbrush,
  Users,
  Shield,
} from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function FeaturesSection() {
  const { t } = useI18n()

  const features = [
    { icon: Layers, title: t("features.layers.title"), description: t("features.layers.desc") },
    { icon: Map, title: t("features.basemaps.title"), description: t("features.basemaps.desc") },
    { icon: Table2, title: t("features.tables.title"), description: t("features.tables.desc") },
    { icon: Paintbrush, title: t("features.customize.title"), description: t("features.customize.desc") },
    { icon: Users, title: t("features.collaborative.title"), description: t("features.collaborative.desc") },
    { icon: Shield, title: t("features.rights.title"), description: t("features.rights.desc") },
  ]

  return (
    <section id="fonctionnalites" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("features.label")}
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            {t("features.title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
