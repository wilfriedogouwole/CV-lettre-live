"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCoverLetters } from '@/hooks/use-cover-letters';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { FileText, Loader2, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CoverLettersPage() {
  const router = useRouter();
  const { coverLetters, isLoading } = useCoverLetters();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateLetter = () => {
    setIsCreating(true);
    router.push('/dashboard/letters/new');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes lettres de motivation</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos lettres de motivation et créez-en de nouvelles
          </p>
        </div>
        <Button onClick={handleCreateLetter} disabled={isCreating}>
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Création...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle lettre
            </>
          )}
        </Button>
      </div>

      {coverLetters.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Aucune lettre de motivation</CardTitle>
            <CardDescription>
              Vous n&apos;avez pas encore créé de lettre de motivation. Commencez par en créer une nouvelle.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={handleCreateLetter} disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Créer ma première lettre
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {coverLetters.map((letter) => (
            <motion.div key={letter.id} variants={item}>
              <Link href={`/dashboard/letters/${letter.id}`}>
                <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{letter.title}</CardTitle>
                    <CardDescription>
                      {letter.jobPosition && letter.company 
                        ? `${letter.jobPosition} - ${letter.company}`
                        : "Aucune information de poste"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>
                        {letter.content.length > 100
                          ? `${letter.content.substring(0, 100)}...`
                          : letter.content}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    Mis à jour {formatDistanceToNow(new Date(letter.updatedAt), { addSuffix: true, locale: fr })}
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}