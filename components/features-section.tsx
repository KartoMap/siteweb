import {
  Layers,
  Map,
  Table2,
  Paintbrush,
  Users,
  Shield,
} from "lucide-react"

const features = [
  {
    icon: Layers,
    title: "Gestion des couches",
    description:
      "Ajoutez, superposez et organisez vos couches de donnees pour creer des cartes riches et informatives.",
  },
  {
    icon: Map,
    title: "Fonds de carte personnalises",
    description:
      "Changez de fond de carte en un clic ou creez votre propre fond de carte adapte a vos besoins.",
  },
  {
    icon: Table2,
    title: "Tables de donnees",
    description:
      "Creez des tables structurees avec vos donnees pour que tout le monde puisse y acceder et les consulter.",
  },
  {
    icon: Paintbrush,
    title: "Personnalisation complete",
    description:
      "Personnalisez chaque aspect de votre carte : couleurs, icones, styles, legendes et bien plus encore.",
  },
  {
    icon: Users,
    title: "Collecte collaborative",
    description:
      "Impliquez vos citoyens et entreprises dans la creation de donnees grace a des formulaires simples.",
  },
  {
    icon: Shield,
    title: "Gestion des droits",
    description:
      "Controlez finement qui peut voir, editer ou administrer chaque element de votre ecosysteme.",
  },
]

export function FeaturesSection() {
  return (
    <section id="fonctionnalites" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Fonctionnalites
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Tout ce dont vous avez besoin pour cartographier vos donnees
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Pas besoin de competences techniques ou cartographiques. KartoMap rend la
            visualisation de donnees accessible a tous.
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
