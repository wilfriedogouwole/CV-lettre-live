"use client"

import LetterPreview from '@/components/letter/letter-preview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getCoverLetter, updateCoverLetter } from '@/lib/cover-letter-actions';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ArrowLeft, Download, Loader2, RefreshCw, Save } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState("edit");
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const letterData = await getCoverLetter(params.id as string);
        setLetter(letterData);
        setPreviewTemplate(letterData.templateId || "template1");
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
        company: letter.company,
        templateId: previewTemplate as string
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
    if (!previewRef.current) return;
    
    setIsDownloading(true);
    setActiveTab("preview");
    
    try {
      // Attendre que le changement d'onglet soit effectué
      setTimeout(async () => {
        const element = previewRef.current;
        if (!element) {
          throw new Error("Élément de prévisualisation non trouvé");
        }
        
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          windowWidth: 210 * 3.78, // Convertir mm en pixels (1mm ≈ 3.78px)
          windowHeight: 297 * 3.78
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        const imgWidth = 210; // Largeur A4 en mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${letter.title || 'Lettre_de_motivation'}.pdf`);
        
        toast({
          title: "Téléchargement terminé",
          description: "Votre lettre de motivation a été téléchargée avec succès"
        });
      }, 500);
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement de la lettre",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setLetter((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChangeTemplate = (templateId: string) => {
    setPreviewTemplate(templateId);
  };

  const handleApplyTemplate = () => {
    if (previewTemplate && previewTemplate !== letter.templateId) {
      setLetter((prev: any) => ({
        ...prev,
        templateId: previewTemplate
      }));
      
      toast({
        title: "Template modifié",
        description: "Le template de votre lettre a été modifié avec succès"
      });
    }
  };

  const handleResetTemplate = () => {
    setPreviewTemplate(letter.templateId || "template1");
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Éditer</TabsTrigger>
          <TabsTrigger value="preview">Aperçu</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-4">
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
                <Textarea 
                  value={letter.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  className="min-h-[400px]"
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Dernière modification: {new Date(letter.updatedAt).toLocaleDateString()}
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h3 className="text-lg font-semibold mb-2 md:mb-0">Choisir un template</h3>
              {previewTemplate !== letter.templateId && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleResetTemplate}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Annuler
                  </Button>
                  <Button size="sm" onClick={handleApplyTemplate}>
                    Appliquer ce template
                  </Button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={previewTemplate === "template1" ? "default" : "outline"} 
                className="text-xs h-auto py-1"
                onClick={() => handleChangeTemplate("template1")}
              >
                Classique
              </Button>
              <Button 
                variant={previewTemplate === "template2" ? "default" : "outline"} 
                className="text-xs h-auto py-1"
                onClick={() => handleChangeTemplate("template2")}
              >
                Moderne
              </Button>
              <Button 
                variant={previewTemplate === "template3" ? "default" : "outline"} 
                className="text-xs h-auto py-1"
                onClick={() => handleChangeTemplate("template3")}
              >
                Créatif
              </Button>
            </div>
          </div>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div ref={previewRef}>
                <LetterPreview letter={letter} templateId={previewTemplate || letter.templateId || "template1"} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}