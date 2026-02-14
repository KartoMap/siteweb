"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function PricingSection() {
  const { t, ta } = useI18n()

  const plans = [
    {
      name: t("pricing.discovery.name"),
      price: t("pricing.discovery.price"),
      priceDetail: "",
      description: t("pricing.discovery.desc"),
      features: ta("pricing.discovery.features"),
      cta: t("pricing.discovery.cta"),
      highlight: false,
    },
    {
      name: t("pricing.enterprise.name"),
      price: t("pricing.enterprise.price"),
      priceDetail: "",
      description: t("pricing.enterprise.desc"),
      features: ta("pricing.enterprise.features"),
      cta: t("pricing.enterprise.cta"),
      highlight: false,
    },
  ]

  return (
    <section id="tarifs" className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t("pricing.label")}
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            {t("pricing.title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all ${
                plan.highlight
                  ? "border-primary bg-background shadow-xl shadow-primary/10"
                  : "border-border bg-background"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    {t("pricing.popular")}
                  </span>
                </div>
              )}
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                {plan.priceDetail ? (
                  <>
                    <span className="font-heading text-4xl font-bold text-foreground">
                      {plan.price}{"€"}
                    </span>
                    <span className="text-muted-foreground">{plan.priceDetail}</span>
                  </>
                ) : (
                  <span className="font-heading text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {plan.description}
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button
                  className={`w-full ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
