"use client"

import CVEditor from '@/components/cv/cv-editor';
import CVPreview from '@/components/cv/cv-preview';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { getCV, updateCV } from '@/lib/cv-actions';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ArrowLeft, Download, Loader2, RefreshCw, Save } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function CVEditPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [cv, setCV] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const cvData = await getCV(params.id as string);
        setCV(cvData);
        setPreviewTemplate(cvData.templateId);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger le CV",
          variant: "destructive"
        });
        router.push('/dashboard/cv');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCV();
  }, [params.id, router, toast]);

  const handleSave = async () => {
    if (!cv) return;

    setIsSaving(true);
    try {
      await updateCV(cv.id, {
        title: cv.title,
        content: cv.content,
        jobPosition: cv.jobPosition,
        company: cv.company
      });

      toast({
        title: "CV enregistré",
        description: "Votre CV a été enregistré avec succès"
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
    setTimeout(async () => {
      const element = previewRef.current;
      if (!element) throw new Error("Élément de prévisualisation non trouvé");

      // Réinitialiser les styles pour la capture complète
      const originalStyles = {
        width: element.style.width,
        height: element.style.height,
        overflow: element.style.overflow,
      };

      // Appliquer des styles optimisés pour l'export
      element.style.width = "210mm"; // Largeur A4
      element.style.maxHeight = "none";
      element.style.overflow = "visible";

      const canvas = await html2canvas(element, {
        scale: 3, // Augmenter l'échelle pour la qualité
        useCORS: true,
        allowTaint: true,
        logging: false,
        scrollY: -window.scrollY, // Ignorer le défilement
      });

      // Restaurer les styles originaux
      Object.assign(element.style, originalStyles);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculer les dimensions de l'image
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Découper en pages si nécessaire
      let position = 0;
      while (position < imgHeight) {
        if (position > 0) pdf.addPage();
        
        const sectionHeight = Math.min(pageHeight, imgHeight - position);
        
        pdf.addImage(
          canvas.toDataURL("image/png", 1.0),
          "PNG",
          0,
          -position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        
        position += pageHeight;
      }

      pdf.save(`${cv.title || "CV"}.pdf`);
      
      toast({
        title: "Téléchargement terminé",
        description: "Votre CV a été téléchargé avec succès",
      });
    }, 500);
  } catch (error) {
    toast({
      title: "Erreur",
      description: "Une erreur est survenue lors du téléchargement du CV",
      variant: "destructive",
    });
  } finally {
    setIsDownloading(false);
  }
};

  const handleUpdateCV = (updatedData: any) => {
    setCV((prev: any) => ({
      ...prev,
      ...updatedData
    }));
  };

  const handleChangeTemplate = (templateId: string) => {
    setPreviewTemplate(templateId);
  };

  const handleApplyTemplate = () => {
    if (previewTemplate && previewTemplate !== cv.templateId) {
      setCV((prev: any) => ({
        ...prev,
        templateId: previewTemplate
      }));
      
      toast({
        title: "Template modifié",
        description: "Le template de votre CV a été modifié avec succès"
      });
    }
  };

  const handleResetTemplate = () => {
    setPreviewTemplate(cv.templateId);
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
          <Button variant="outline" size="icon" onClick={() => router.push('/dashboard/cv')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{cv.title}</h1>
            <p className="text-muted-foreground">
              {cv.jobPosition && cv.company 
                ? `${cv.jobPosition} - ${cv.company}`
                : "Aucune information de poste"}
            </p>
          </div>
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
          <CVEditor cv={cv} onUpdateCV={handleUpdateCV} />
        </TabsContent>
        <TabsContent value="preview" className="space-y-4">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h3 className="text-lg font-semibold mb-2 md:mb-0">Choisir un template</h3>
              {previewTemplate !== cv.templateId && (
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
            <div className="grid grid-cols-5 gap-2">
              <Button 
                variant={previewTemplate === "template1" ? "default" : "outline"} 
                className="text-xs h-auto py-1"
                onClick={() => handleChangeTemplate("template1")}
              >
                Élégant
              </Button>
              <Button 
                variant={previewTemplate === "template2" ? "default" : "outline"} 
                className="text-xs h-auto py-1"
                onClick={() => handleChangeTemplate("template2")}
              >
                Créatif
              </Button>
              <Button 
                variant={previewTemplate === "template3" ? "default" : "outline"} 
                className="text-xs h-auto py-1"
                onClick={() => handleChangeTemplate("template3")}
              >
                Minimaliste
              </Button>
              <Button 
                variant={previewTemplate === "template4" ? "default" : "outline"} 
                className="text-xs h-auto py-1"
                onClick={() => handleChangeTemplate("template4")}
              >
                Professionnel
              </Button>
              <Button 
                variant={previewTemplate === "template5" ? "default" : "outline"} 
                className="text-xs h-auto py-1"
                onClick={() => handleChangeTemplate("template5")}
              >
                Moderne
              </Button>
              <Button 
                variant={previewTemplate === "template nouveau" ? "default" : "outline"} 
                className="text-xs h-auto py-1"
                onClick={() => handleChangeTemplate("template nouveau")}
              >
                Nouveau
              </Button>
            </div>
          </div>
          <div ref={previewRef}>
            <CVPreview cv={cv} templateId={previewTemplate || cv.templateId} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}