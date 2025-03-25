"use client";

import { Hero } from '@/components/hero';
import { HeroParallaxDemo } from '@/components/HeroParallaxDemo';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Check, ChevronDown, FileText, Lightbulb, Menu, MoveRight, Palette, PenLine, Sparkles, Star } from 'lucide-react';
import { useTheme } from "next-themes";
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';


export default function Home() {
  const { setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>CV Master - Créez des CV professionnels</title>
        <meta name="description" content="Créez des CV et lettres de motivation qui font impression avec CV Master." />
      </Head>

      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6" aria-label="Logo CV Master" />
            <span className="hidden md:flex font-bold text-xl">CV Master</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/cv-templates" className="text-sm font-medium hover:text-primary">
              Modèles de CV
            </Link>
            <Link href="/cover-letters" className="text-sm font-medium hover:text-primary">
              Lettres de motivation
            </Link>
            <Link href="/conseils" className="text-sm font-medium hover:text-primary">
              Conseils
            </Link>
            <Link href="/jobs" className="text-sm font-medium hover:text-primary">
              Offres d&lsquo;emploi
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="outline">Tableau de bord</Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Inscription</Button>
              </Link>
            </SignedOut>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-5 w-5" aria-label="Ouvrir le menu" />
              </Button>
            </div>

            {isMenuOpen && (
              <div className="absolute top-16 right-4 bg-card border rounded-lg shadow-lg z-50 md:hidden">
                <div className="flex flex-col p-4 space-y-4">
                  <Link href="/cv-templates" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Modèles de CV
                  </Link>
                  <Link href="/cover-letters" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Lettres de motivation
                  </Link>
                  <Link href="/conseils" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Conseils
                  </Link>
                  <Link href="/jobs" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Offres d&lsquo;emploi
                  </Link>
                </div>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Changer le thème">
                  <Palette className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Clair
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Sombre
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("blue")}>
                  Bleu
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("green")}>
                  Vert
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("purple")}>
                  Violet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          className="py-0 md:py-0 bg-gradient-to-b from-background to-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
               <section className="md:hidden sm:hidden">
		
						<HeroParallaxDemo />
			</section>

          <section className="hidden md:block sm:block"><Hero/></section>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="py-20 bg-background"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Tout ce dont vous avez besoin pour réussir votre recherche d&apos;emploi
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-card p-8 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <FileText className="h-8 w-8 text-primary" aria-label="Modèles de CV" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Modèles de CV professionnels</h3>
                <p className="text-muted-foreground mb-6">
                  Choisissez parmi 5 modèles de CV conçus par des experts en recrutement pour maximiser vos chances.
                </p>
                <Link href="/cv-templates" className="mt-auto">
                  <Button variant="outline" className="group">
                    Explorer les modèles
                    <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <PenLine className="h-8 w-8 text-primary" aria-label="Lettres de motivation" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lettres de motivation personnalisées</h3>
                <p className="text-muted-foreground mb-6">
                  Créez des lettres de motivation adaptées à chaque offre d&apos;emploi pour augmenter vos chances d&apos;entretien.
                </p>
                <Link href="/cover-letters" className="mt-auto">
                  <Button variant="outline" className="group">
                    Rédiger une lettre
                    <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <Lightbulb className="h-8 w-8 text-primary" aria-label="Conseils d'experts" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Conseils d&apos;experts</h3>
                <p className="text-muted-foreground mb-6">
                  Accédez à des conseils pratiques pour optimiser votre candidature et réussir vos entretiens d&apos;embauche.
                </p>
                <Link href="/conseils" className="mt-auto">
                  <Button variant="outline" className="group">
                    Découvrir les conseils
                    <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Advanced Features Section */}
        <motion.section
          className="py-20 bg-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Fonctionnalités avancées
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Suivi des candidatures
                </h3>
                <p className="text-muted-foreground">
                  Gardez une trace de toutes vos candidatures, avec des rappels pour les relances et des statistiques sur vos taux de réponse.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Analyse ATS
                </h3>
                <p className="text-muted-foreground">
                  Notre système analyse votre CV pour s&apos;assurer qu&apos;il passe les filtres des logiciels de recrutement (ATS).
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Moteur de recherche intégré
                </h3>
                <p className="text-muted-foreground">
                  Trouvez des offres d&apos;emploi directement depuis notre plateforme et postulez en quelques clics.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Suggestions personnalisées
                </h3>
                <p className="text-muted-foreground">
                  Recevez des suggestions d&apos;amélioration pour votre CV et lettre de motivation basées sur votre secteur d&apos;activité.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* How it works Section */}
        <motion.section
          className="py-20 bg-background"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Comment ça marche
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="relative flex flex-col justify-center items-center">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-6">1</div>
                <h3 className="text-xl font-semibold mb-3">Choisissez un modèle</h3>
                <p className="text-muted-foreground text-center">
                  Parcourez notre collection de modèles professionnels et sélectionnez celui qui correspond le mieux à votre profil et au poste visé.
                </p>
              </div>
              <div className="relative flex flex-col justify-center items-center">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-6">2</div>
                <h3 className="text-xl font-semibold mb-3">Personnalisez votre contenu</h3>
                <p className="text-muted-foreground text-center">
                  Ajoutez vos informations personnelles, expériences professionnelles et compétences dans notre éditeur intuitif.
                </p>
              </div>
              <div className="relative flex flex-col justify-center items-center">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-6">3</div>
                <h3 className="text-xl font-semibold mb-3">Téléchargez et postulez</h3>
                <p className="text-muted-foreground text-center">
                  Prévisualisez votre document, téléchargez-le au format PDF et commencez à postuler avec confiance.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section
          className="py-20 bg-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Tarification simple et transparente
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold">Gratuit</h3>
                  <p className="text-muted-foreground mt-2">Pour essayer les fonctionnalités de base</p>
                  <div className="mt-6">
                    <span className="text-3xl font-bold">0€</span>
                    <span className="text-muted-foreground">/mois</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>2 modèles de CV</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>1 modèle de lettre de motivation</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Consultation des offres d&apos;emploi</span>
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <Check className="h-5 w-5 text-muted-foreground mr-2" />
                      <span className="line-through">Analyse ATS</span>
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <Check className="h-5 w-5 text-muted-foreground mr-2" />
                      <span className="line-through">Suivi des candidatures</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-8">
                    Commencer gratuitement
                  </Button>
                </div>
              </div>

              {/* Pro Plan (Highlighted) */}
              <div className="bg-card rounded-lg border-2 border-primary shadow-lg overflow-hidden relative">
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                  POPULAIRE
                </div>
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold">Professionnel</h3>
                  <p className="text-muted-foreground mt-2">Pour une recherche d&apos;emploi optimale</p>
                  <div className="mt-6">
                    <span className="text-3xl font-bold">9.99€</span>
                    <span className="text-muted-foreground">/mois</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Tous les modèles de CV (5+)</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Tous les modèles de lettres</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Analyse ATS complète</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Suivi des candidatures</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Suggestions personnalisées</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-8">
                    Choisir ce plan
                  </Button>
                </div>
              </div>

              {/* Premium Plan */}
              <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold">Premium</h3>
                  <p className="text-muted-foreground mt-2">Pour les chercheurs d&apos;emploi sérieux</p>
                  <div className="mt-6">
                    <span className="text-3xl font-bold">19.99€</span>
                    <span className="text-muted-foreground">/mois</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Tous les avantages Pro</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Relecture par un expert</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Accès prioritaire aux offres</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Simulation d&apos;entretien</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Support premium</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-8">
                    Choisir ce plan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          className="py-20 bg-background"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Ils ont trouvé leur emploi grâce à CV Master
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                &apos;Grâce à CV Master, j&apos;ai pu créer un CV professionnel en quelques minutes. J&apos;ai décroché 3 entretiens la première semaine et j&apos;ai finalement obtenu le poste de mes rêves !&quot;
                </p>
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center text-primary font-bold mr-3">
                    JD
                  </div>
                  <div>
                    <h4 className="font-semibold">Jean D.</h4>
                    <p className="text-sm text-muted-foreground">Développeur Full-Stack</p>
                  </div>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                  Le suivi des candidatures m&apos;a permis de rester organisée dans ma recherche d&apos;emploi. J&apos;ai pu relancer au bon moment et cela a fait toute la différence.
                </p>
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center text-primary font-bold mr-3">
                    MS
                  </div>
                  <div>
                    <h4 className="font-semibold">Marie S.</h4>
                    <p className="text-sm text-muted-foreground">Chef de projet marketing</p>
                  </div>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">
                  &quot;L&apos;analyse ATS m&apos;a montré que mon CV n&apos;était pas optimisé. Après les corrections, j&apos;ai reçu beaucoup plus de réponses positives des recruteurs.&quot;
                </p>
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center text-primary font-bold mr-3">
                    TP
                  </div>
                  <div>
                    <h4 className="font-semibold">Thomas P.</h4>
                    <p className="text-sm text-muted-foreground">Responsable commercial</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="py-20 bg-primary text-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <p className="text-primary-foreground/80">Utilisateurs satisfaits</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">85%</div>
                <p className="text-primary-foreground/80">Taux de réussite</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5,000+</div>
                <p className="text-primary-foreground/80">CV créés</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24h</div>
                <p className="text-primary-foreground/80">Support réactif</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          className="py-20 bg-background"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: "Comment puis-je essayer CV Master gratuitement ?",
                  answer: "Vous pouvez créer un compte gratuitement et accéder à nos fonctionnalités de base sans engagement. Aucune carte bancaire n'est requise pour l'essai gratuit."
                },
                {
                  question: "Quels formats d'export sont disponibles ?",
                  answer: "Vous pouvez télécharger vos documents au format PDF, qui est le format standard pour les candidatures. Nous proposons également l'export en format Word pour certaines offres."
                },
                {
                  question: "Comment fonctionne l'analyse ATS ?",
                  answer: "Notre système scanne votre CV et vérifie sa compatibilité avec les logiciels de recrutement utilisés par les entreprises. Il vous fournit des suggestions pour améliorer votre visibilité."
                },
                {
                  question: "Puis-je annuler mon abonnement à tout moment ?",
                  answer: "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. L'annulation prend effet à la fin de la période payée."
                },
                {
                  question: "CV Master est-il adapté à tous les secteurs d'activité ?",
                  answer: "Absolument ! Nous proposons des modèles et conseils adaptés à tous les secteurs, du technique au commercial en passant par la santé et l'éducation."
                }
              ].map((item, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center p-6 text-left"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="font-semibold">{item.question}</h3>
                    <ChevronDown className={`h-5 w-5 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === index && (
                    <div className="px-6 pb-6 pt-0 text-muted-foreground">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-20 bg-primary text-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Sparkles className="h-12 w-12 mx-auto mb-6" aria-label="Étincelles" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à booster votre carrière ?
              </h2>
              <p className="text-xl mb-10 text-primary-foreground/80">
                Rejoignez des milliers de candidats qui ont déjà trouvé leur emploi idéal grâce à nos outils.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up">
                  <Button size="lg" variant="secondary" className="group">
                    Créer mon compte gratuitement
                    <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/pricing">
                <Button size="lg" variant="secondary" className="group">
                Voir les tarifs
                    <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}