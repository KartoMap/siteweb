import { MapPin, Layers, Zap, Users, Code, Globe, Database, Radio } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="KartoMap" className="h-12 w-auto" />
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">Fonctionnalités</a>
              <a href="#ecosystem" className="text-gray-700 hover:text-cyan-600 transition-colors font-medium">Écosystème</a>
              <a href="#contact" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-medium">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100"></div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-6 py-20 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 space-y-8">
                <div className="inline-block animate-float">
                  <img src="/logo.png" alt="KartoMap" className="h-24 w-auto mx-auto mb-8 drop-shadow-2xl" />
                </div>

                <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-tight animate-fade-in-up">
                  Cartographie collaborative
                  <br />
                  <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 bg-clip-text text-transparent animate-gradient">
                    open source
                  </span>
                </h1>

                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
                  Un écosystème d'applications pour recenser et visualiser les données géographiques de votre territoire. Simple, intuitif et accessible à tous.
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-4 animate-fade-in-up animation-delay-400">
                  <a
                    href="https://github.com/KartoMap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold flex items-center gap-3 text-lg hover:scale-105 hover:-translate-y-1"
                  >
                    <Code className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    Rejoindre sur GitHub
                  </a>
                  <a
                    href="#contact"
                    className="group bg-white text-gray-700 px-10 py-5 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold border-2 border-gray-200 hover:border-cyan-500 text-lg hover:scale-105 hover:-translate-y-1"
                  >
                    Demander une démo
                  </a>
                </div>
              </div>

              <div className="mt-16 relative animate-fade-in-up animation-delay-600 max-w-3xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400 rounded-3xl blur-3xl opacity-30 animate-pulse-slow"></div>
                <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                  <div className="w-full aspect-square max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
                    <img
                      src="/karto_my_perso.png"
                      alt="KartoMap Character"
                      className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 animate-float-slow"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up animation-delay-800">
                <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="text-4xl font-bold text-cyan-600 mb-2">Open</div>
                  <div className="text-gray-600 font-medium">Source</div>
                </div>
                <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="text-4xl font-bold text-blue-600 mb-2">Multi</div>
                  <div className="text-gray-600 font-medium">Couches</div>
                </div>
                <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="text-4xl font-bold text-green-600 mb-2">Temps</div>
                  <div className="text-gray-600 font-medium">Réel</div>
                </div>
                <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="text-4xl font-bold text-orange-600 mb-2">API</div>
                  <div className="text-gray-600 font-medium">Ouverte</div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#features" className="flex flex-col items-center gap-2 text-gray-400 hover:text-cyan-600 transition-colors">
              <span className="text-sm font-medium">Découvrir</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Une interface fluide et intuitive</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Créez des cartes sophistiquées en quelques clics. Pour tous les utilisateurs, tous les métiers.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 lg:order-1">
                <img
                  src="/createmap.png"
                  alt="Créer des cartes"
                  className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Création de cartes simplifiée</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-cyan-50 transition-colors">
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-lg">
                      <Layers className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Couches multiples</h4>
                      <p className="text-gray-600">Superposez facilement différentes couches de données sur vos cartes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Fonds de carte variés</h4>
                      <p className="text-gray-600">Choisissez parmi plusieurs styles de fond de carte adaptés à vos besoins</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-orange-50 transition-colors">
                    <div className="bg-gradient-to-br from-orange-500 to-yellow-600 p-3 rounded-lg">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Gestion des données</h4>
                      <p className="text-gray-600">Importez et exportez vos données vers d'autres logiciels</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Utilisation professionnelle</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50 transition-colors">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Pour tous les acteurs</h4>
                      <p className="text-gray-600">Citoyens, entreprises et collectivités collaborent sur une même plateforme</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-cyan-50 transition-colors">
                    <div className="bg-gradient-to-br from-cyan-500 to-teal-600 p-3 rounded-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Interface rapide</h4>
                      <p className="text-gray-600">Performance optimale pour une expérience fluide et réactive</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors">
                    <div className="bg-gradient-to-br from-green-500 to-lime-600 p-3 rounded-lg">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Accessible partout</h4>
                      <p className="text-gray-600">Application web accessible depuis n'importe quel navigateur</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="/useapp.png"
                  alt="Utiliser l'application"
                  className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="ecosystem" className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Un écosystème complet</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Applications interconnectées pour gérer toutes vos données géographiques
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Recensement urbain</h3>
                <p className="text-gray-600">
                  Cartographiez et gérez l'ensemble du mobilier urbain de votre territoire
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Radio className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Géolocalisation en temps réel</h3>
                <p className="text-gray-600">
                  Suivez vos véhicules et ressources en direct avec mise à jour automatique
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-orange-500 to-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Layers className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Lignes de transport</h3>
                <p className="text-gray-600">
                  Visualisez et gérez les réseaux de transport public et leurs itinéraires
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">APIs ouvertes</h3>
                <p className="text-gray-600">
                  Intégrez facilement KartoMap avec vos systèmes existants via notre API REST
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-teal-500 to-cyan-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">WebSocket</h3>
                <p className="text-gray-600">
                  Connexion temps réel entre frontend et backend pour des données à jour
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-lime-500 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Export de données</h3>
                <p className="text-gray-600">
                  Exportez vos données vers vos logiciels métiers dans différents formats
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 rounded-3xl p-12 lg:p-16 shadow-2xl">
              <div className="max-w-3xl mx-auto text-center text-white">
                <h2 className="text-4xl font-bold mb-6">Projet open source</h2>
                <p className="text-xl mb-8 text-white/90 leading-relaxed">
                  KartoMap est un projet open source qui connecte les entreprises, les collectivités et les citoyens autour des données géographiques. Rejoignez notre communauté de développeurs ou découvrez notre solution.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://github.com/KartoMap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-cyan-600 px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold flex items-center gap-2 hover:scale-105"
                  >
                    <Code className="w-5 h-5" />
                    Voir le code source
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
                <p className="text-xl text-gray-600">
                  Vous souhaitez contribuer au projet ou demander une démonstration ?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Développeurs</h3>
                  <p className="text-gray-600 mb-6">
                    Contribuez au projet KartoMap sur GitHub et participez à l'évolution de l'écosystème.
                  </p>
                  <a
                    href="https://github.com/KartoMap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:gap-3 transition-all"
                  >
                    Rejoindre sur GitHub
                    <span>→</span>
                  </a>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Demande de démo</h3>
                  <p className="text-gray-600 mb-6">
                    Vous avez des questions ou souhaitez découvrir KartoMap ? Contactez-nous par email.
                  </p>
                  <a
                    href="mailto:dev@dochot.be"
                    className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all"
                  >
                    dev@dochot.be
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="KartoMap" className="h-10 w-auto" />
            </div>
            <div className="text-gray-400 text-center md:text-left">
              © 2026 KartoMap - Projet open source pour la cartographie collaborative
            </div>
            <div className="flex gap-6">
              <a
                href="https://github.com/KartoMap"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:dev@dochot.be"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
