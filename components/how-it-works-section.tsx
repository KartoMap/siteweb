const steps = [
  {
    number: "01",
    title: "Connectez vos sources",
    description:
      "Importez vos donnees depuis vos applications existantes grace a nos API ouvertes ou nos connecteurs natifs. CSV, GeoJSON, bases de donnees, tout est possible.",
  },
  {
    number: "02",
    title: "Visualisez sur la carte",
    description:
      "Vos donnees apparaissent automatiquement sur la carte. Ajoutez des couches, personnalisez le style et choisissez votre fond de carte ideal.",
  },
  {
    number: "03",
    title: "Collaborez et partagez",
    description:
      "Invitez vos equipes, definissez les droits d'acces et partagez vos cartes avec le monde entier. Chaque acteur a le bon niveau de visibilite.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-card py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Comment ca marche
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Trois etapes pour cartographier vos donnees
          </h2>
        </div>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-border lg:left-1/2 lg:block" />

          <div className="flex flex-col gap-12 lg:gap-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-16 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Number bubble */}
                <div className="absolute left-0 z-10 hidden lg:left-1/2 lg:block lg:-translate-x-1/2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-card bg-primary text-lg font-bold text-primary-foreground">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 1 ? "lg:text-right" : ""}`}>
                  <div className="flex items-center gap-4 lg:hidden">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {step.number}
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <h3 className="hidden font-heading text-xl font-semibold text-foreground lg:block">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted-foreground lg:mt-2">
                    {step.description}
                  </p>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
