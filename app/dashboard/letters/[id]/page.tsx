"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getCoverLetter, updateCoverLetter } from '@/lib/cover-letter-actions';
import jsPDF from 'jspdf';
import { ArrowLeft, Download, Loader2, Save } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function CoverLetterEditPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [letter, setLetter] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const letterData = await getCoverLetter(params.id as string);
        setLetter(letterData);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger la lettre de motivation",
          variant: "destructive"
        });
        router.push('/dashboard/letters');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLetter();
  }, [params.id, router, toast]);

  const handleSave = async () => {
    if (!letter) return;

    setIsSaving(true);
    try {
      await updateCoverLetter(letter.id, {
        title: letter.title,
        content: letter.content,
        jobPosition: letter.jobPosition,
        company: letter.company
      });

      toast({
        title: "Lettre enregistrée",
        description: "Votre lettre de motivation a été enregistrée avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async () => {
    if (!letter) return;
    
    setIsDownloading(true);
    
    try {
      // Créer un nouveau document PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Ajouter un en-tête
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(letter.title, 20, 20);
      
      // Ajouter les informations de base
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      if (letter.jobPosition) {
        pdf.text(`Poste: ${letter.jobPosition}`, 20, 30);
      }
      if (letter.company) {
        pdf.text(`Entreprise: ${letter.company}`, 20, 37);
      }
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 44);
      
      // Ajouter le contenu principal
      pdf.setFontSize(11);
      
      // Diviser le contenu en lignes pour éviter les débordements
      const contentWidth = 170; // Largeur disponible en mm
      const contentLines = pdf.splitTextToSize(letter.content, contentWidth);
      
      pdf.text(contentLines, 20, 55);
      
      // Enregistrer le PDF
      pdf.save(`${letter.title || 'Lettre_de_motivation'}.pdf`);
      
      toast({
        title: "Téléchargement terminé",
        description: "Votre lettre de motivation a été téléchargée avec succès"
      });
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement de la lettre",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setLetter((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0 mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => router.push('/dashboard/letters')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{letter.title}</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </>
            )}
          </Button>
          <Button onClick={handleDownload} disabled={isDownloading}>
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Génération PDF...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Télécharger PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations de la lettre</CardTitle>
            <CardDescription>
              Modifiez les informations de base de votre lettre de motivation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de la lettre</Label>
              <Input 
                id="title" 
                value={letter.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Poste visé</Label>
              <Input 
                id="position" 
                value={letter.jobPosition || ''}
                onChange={(e) => handleChange('jobPosition', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise</Label>
              <Input 
                id="company" 
                value={letter.company || ''}
                onChange={(e) => handleChange('company', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contenu de la lettre</CardTitle>
            <CardDescription>
              Rédigez le contenu de votre lettre de motivation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div ref={contentRef}>
              <Textarea 
                value={letter.content}
                onChange={(e) => handleChange('content', e.target.value)}
                className="min-h-[400px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Dernière modification: {new Date(letter.updatedAt).toLocaleDateString()}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}