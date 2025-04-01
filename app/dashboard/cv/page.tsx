"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCVs } from '@/hooks/use-cvs';
import { toast } from '@/hooks/use-toast';
import { deleteCV } from '@/lib/cv-actions';
import { templates } from '@/lib/templates';
import { CV } from '@prisma/client';
import confetti from 'canvas-confetti';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { FileText, Loader2, PlusCircle, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function CVPage() {
  const router = useRouter();
  const { cvs, isLoading,mutate } = useCVs();
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  const handleCreateCV = () => {
    setIsCreating(true);
    router.push('/dashboard/cv/templates');
  };


  const handleDeleteCV = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteCV(id);
      mutate(cvs.filter(cv => cv.id !== id));
      toast({
        title: "CV supprimé",
        description: "Le CV a été supprimé avec succès"
      });
      confetti();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le CV",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
   {cvs.map((cv: CV) => {
            const currentTemplate = templates[cv.templateId as keyof typeof templates] || templates.template1;
  
            return (            <motion.div key={cv.id} variants={item}>
                <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
                
                  <CardHeader className="pb-2">
                  <Link href={`/dashboard/cv/${cv.id}`}>
                    <CardTitle className="text-xl hover:text-red-500">{cv.title}</CardTitle>
                    </Link>

                    <CardDescription>
                      {cv.jobPosition && cv.company 
                        ? `${cv.jobPosition} - ${cv.company}`
                        : "Aucune information de poste"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center relative text-sm text-muted-foreground">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Modèle:{currentTemplate.name + " "}</span>
                      <div className="aspect-[4/3] absolute top-4 right-0 overflow-hidden">
                     <Image
                        src={currentTemplate.thumbnail}
                        alt={`Aperçu du CV ${cv.title}`}
                      width={90}
                      height={90}
                      className=" rounded-lg object-cover"
                    />
                  </div>
                    </div>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    Mis à jour {formatDistanceToNow(new Date(cv.updatedAt), { addSuffix: true, locale: fr })}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Cette action ne peut pas être annulée. Le CV sera définitivement supprimé.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteCV(cv.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Suppression...
                              </>
                            ) : (
                              "Supprimer"
                            )}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              
            </motion.div>
          );
        })}
        </motion.div>
      )}
    </div>
  );
}