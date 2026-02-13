import type { Metadata } from 'next'
import { Inter, DM_Sans } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })

export const metadata: Metadata = {
  title: 'KartoMap - Visualisez vos donnees sur une carte, simplement',
  description:
    'KartoMap est la plateforme cartographique no-code pour les entreprises, citoyens et communautes. Connectez vos donnees, visualisez-les sur une carte et partagez-les facilement.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
