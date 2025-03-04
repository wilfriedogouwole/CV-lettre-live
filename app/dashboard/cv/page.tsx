"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCVs } from '@/hooks/use-cvs';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { FileText, Loader2, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CVPage() {
  const router = useRouter();
  const { cvs, isLoading } = useCVs();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCV = () => {
    setIsCreating(true);
    router.push('/dashboard/cv/templates');
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
          <h1 className="text-3xl font-bold tracking-tight">Mes CV</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos CV et créez-en de nouveaux
          </p>
        </div>
        <Button onClick={handleCreateCV} disabled={isCreating}>
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Création...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouveau CV
            </>
          )}
        </Button>
      </div>

      {cvs.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Aucun CV</CardTitle>
            <CardDescription>
              Vous n&apos;avez pas encore créé de CV. Commencez par en créer un nouveau.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={handleCreateCV} disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Créer mon premier CV
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
          {cvs.map((cv) => (
            <motion.div key={cv.id} variants={item}>
              <Link href={`/dashboard/cv/${cv.id}`}>
                <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{cv.title}</CardTitle>
                    <CardDescription>
                      {cv.jobPosition && cv.company 
                        ? `${cv.jobPosition} - ${cv.company}`
                        : "Aucune information de poste"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Modèle: Template {cv.templateId}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    Mis à jour {formatDistanceToNow(new Date(cv.updatedAt), { addSuffix: true, locale: fr })}
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