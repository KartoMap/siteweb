"use client"

import { Building2, Users, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function EcosystemSection() {
  const { t, ta } = useI18n()

  const audiences = [
    {
      icon: Building2,
      title: t("ecosystem.businesses.title"),
      description: t("ecosystem.businesses.desc"),
      items: ta("ecosystem.businesses.items"),
    },
    {
      icon: Users,
      title: t("ecosystem.citizens.title"),
      description: t("ecosystem.citizens.desc"),
      items: ta("ecosystem.citizens.items"),
    },
    {
      icon: Globe,
      title: t("ecosystem.communities.title"),
      description: t("ecosystem.communities.desc"),
      items: ta("ecosystem.communities.items"),
    },
  ]

  return (
    <section id="ecosysteme" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("ecosystem.label")}
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            {t("ecosystem.title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t("ecosystem.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="flex flex-col rounded-2xl border border-border bg-background p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <audience.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                {audience.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {audience.description}
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {audience.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Button variant="ghost" className="text-primary hover:text-primary/80 p-0 h-auto">
                  {t("ecosystem.learnMore")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
