import { Footer } from '@/components/footer/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { frFR } from '@clerk/localizations'; // <-- Correction ici
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CV & Lettre de Motivation - Créez des documents professionnels',
  description: 'Créez des CV et des lettres de motivation professionnels avec notre outil en ligne facile à utiliser.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={frFR}>
      <html lang="fr" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            themes={["light", "dark", "blue", "green", "purple"]}
          >
            {children}
            <Toaster />
            <SonnerToaster />
          </ThemeProvider>
        </body>
        <footer>
        <Footer />
        </footer>
      </html>
    </ClerkProvider>
  );
}