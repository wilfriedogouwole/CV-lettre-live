"use client";

import { Hero } from '@/components/hero';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { FileText, Lightbulb, Menu, MoveRight, Palette, PenLine, Sparkles } from 'lucide-react';
import { useTheme } from "next-themes";
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const { setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'ouverture du menu

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
            <span className=" hidden md:flex font-bold text-xl">CV Master</span>
          </Link>

          {/* Menu horizontal (visible sur md et plus) */}
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

          {/* Boutons d'authentification et de thème */}
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
            {/* Bouton de menu hamburger (visible sur les petits écrans) */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" aria-label="Ouvrir le menu" />
            </Button>
          </div>

          {/* Menu déroulant (visible sur les petits écrans) */}
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
<section><Hero/></section>

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

        {/* How it works Section */}
        <motion.section
          className="py-20 bg-muted"
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
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mb-6 te">1</div>
                <h3 className="text-xl font-semibold mb-3">Choisissez un modèle</h3>
                <p className="text-muted-foreground text-center">
                  Parcourez notre collection de modèles professionnels et sélectionnez celui qui correspond le mieux à votre profil et au poste visé.
                </p>
              </div>
              <div className="relative flex flex-col justify-center items-center ">
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

        {/* CTA Section */}
        <motion.section
          className="py-20 bg-primary text-primary-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
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
              <Link href="/sign-up">
                <Button size="lg" variant="secondary" className="group">
                  Créer mon compte gratuitement
                  <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}