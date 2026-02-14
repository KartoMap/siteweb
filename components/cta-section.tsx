"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function CtaSection() {
  const { t } = useI18n()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="rounded-3xl bg-foreground px-8 py-16 sm:px-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-background sm:text-4xl text-balance">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-background/70">
            {t("cta.subtitle")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {t("cta.primary")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-background/20 text-background hover:bg-background/10"
            >
              {t("cta.secondary")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
