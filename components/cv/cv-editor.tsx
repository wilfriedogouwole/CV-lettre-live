"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface CVEditorProps {
  cv: any;
  onUpdateCV: (data: any) => void;
}

export default function CVEditor({ cv, onUpdateCV }: CVEditorProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const [photoPreview, setPhotoPreview] = useState<string | null>(cv.content.personalInfo.photo || null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5242880, // 5MB
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setPhotoPreview(result);
          handlePersonalInfoChange('photo', result);
        };
        reader.readAsDataURL(file);
      }
    }
  });

  const handlePersonalInfoChange = (field: string, value: string) => {
    onUpdateCV({
      content: {
        ...cv.content,
        personalInfo: {
          ...cv.content.personalInfo,
          [field]: value
        }
      }
    });
  };

  const handleMetadataChange = (field: string, value: string) => {
    onUpdateCV({
      [field]: value
    });
  };

  const addEducation = () => {
    onUpdateCV({
      content: {
        ...cv.content,
        education: [
          ...cv.content.education,
          {
            id: Date.now().toString(),
            degree: "",
            institution: "",
            location: "",
            startDate: "",
            endDate: "",
            description: ""
          }
        ]
      }
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...cv.content.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };

    onUpdateCV({
      content: {
        ...cv.content,
        education: updatedEducation
      }
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...cv.content.education];
    updatedEducation.splice(index, 1);

    onUpdateCV({
      content: {
        ...cv.content,
        education: updatedEducation
      }
    });
  };

  const addExperience = () => {
    onUpdateCV({
      content: {
        ...cv.content,
        experience: [
          ...cv.content.experience,
          {
            id: Date.now().toString(),
            position: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
           descriptionList: [""] 
          }
        ]
      }
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updatedExperience = [...cv.content.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };

    onUpdateCV({
      content: {
        ...cv.content,
        experience: updatedExperience
      }
    });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = [...cv.content.experience];
    updatedExperience.splice(index, 1);

    onUpdateCV({
      content: {
        ...cv.content,
        experience: updatedExperience
      }
    });
  };

  const addSkill = () => {
    onUpdateCV({
      content: {
        ...cv.content,
        skills: [
          ...cv.content.skills,
          {
            id: Date.now().toString(),
            name: "",
            level: "Intermédiaire"
          }
        ]
      }
    });
  };

  const updateSkill = (index: number, field: string, value: string) => {
    const updatedSkills = [...cv.content.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };

    onUpdateCV({
      content: {
        ...cv.content,
        skills: updatedSkills
      }
    });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...cv.content.skills];
    updatedSkills.splice(index, 1);

    onUpdateCV({
      content: {
        ...cv.content,
        skills: updatedSkills
      }
    });
  };

  const addLanguage = () => {
    onUpdateCV({
      content: {
        ...cv.content,
        languages: [
          ...cv.content.languages,
          {
            id: Date.now().toString(),
            name: "",
            level: "Intermédiaire"
          }
        ]
      }
    });
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const updatedLanguages = [...cv.content.languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value
    };

    onUpdateCV({
      content: {
        ...cv.content,
        languages: updatedLanguages
      }
    });
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...cv.content.languages];
    updatedLanguages.splice(index, 1);

    onUpdateCV({
      content: {
        ...cv.content,
        languages: updatedLanguages
      }
    });
  };

  const addReference = () => {
    onUpdateCV({
      content: {
        ...cv.content,
        references: [
          ...(cv.content.references || []),
          {
            id: Date.now().toString(),
            name: "",
            title: "",
            company: "",
            email: "",
            phone: ""
          }
        ]
      }
    });
  };

  const updateReference = (index: number, field: string, value: string) => {
    const updatedReferences = [...(cv.content.references || [])];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value
    };

    onUpdateCV({
      content: {
        ...cv.content,
        references: updatedReferences
      }
    });
  };

  const removeReference = (index: number) => {
    const updatedReferences = [...(cv.content.references || [])];
    updatedReferences.splice(index, 1);

    onUpdateCV({
      content: {
        ...cv.content,
        references: updatedReferences
      }
    });
  };


  const addHobbit = () => {
    onUpdateCV({
      content: {
        ...cv.content,
        interests: [
          ...(cv.content.interests || []),
          {
            id: Date.now().toString(),
            name: ""
          }
        ]
      }
    });
  };


  
  const updateHobbit = (index: number, field: string, value: string) => {
    const updateHobbit = [...(cv.content.interests || [])];
    updateHobbit[index] = {
      ...updateHobbit[index],
      [field]: value
    };

    onUpdateCV({
      content: {
        ...cv.content,
        interests: updateHobbit
      }
    });
  };

  const removeHobbit = (index: number) => {
    const updatedHobbit = [...(cv.content.interests || [])];
    updatedHobbit.splice(index, 1);

    onUpdateCV({
      content: {
        ...cv.content,
        interests: updatedHobbit
      }
    });
  };








  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations du CV</CardTitle>
          <CardDescription>
            Modifiez les informations générales de votre CV
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du CV</Label>
              <Input 
                id="title" 
                value={cv.title}
                onChange={(e) => handleMetadataChange('title', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobPosition">Poste visé</Label>
              <Input 
                id="jobPosition" 
                value={cv.jobPosition || ''}
                onChange={(e) => handleMetadataChange('jobPosition', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise</Label>
              <Input 
                id="company" 
                value={cv.company || ''}
                onChange={(e) => handleMetadataChange('company', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-7">
          <TabsTrigger value="personal">Profil</TabsTrigger>
          <TabsTrigger value="education">Formation</TabsTrigger>
          <TabsTrigger value="experience">Expérience</TabsTrigger>
          <TabsTrigger value="skills">Compétences</TabsTrigger>
          <TabsTrigger value="languages">Langues</TabsTrigger>
          <TabsTrigger value="references">Références</TabsTrigger>
          <TabsTrigger value="interests">Centre d&apos;intéret</TabsTrigger>


        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Ajoutez vos informations personnelles et de contact
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Photo de profil</Label>
                  <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <input {...getInputProps()} />
                    {photoPreview ? (
                      <div className="flex flex-col items-center">
                        <Image 
                          src={photoPreview} 
                          alt="Photo de profil"
                          width={250}
                          height={250}
                          className="w-32 h-32 object-cover rounded-full mb-2"
                        />
                        <p className="text-sm text-muted-foreground">Cliquez ou glissez-déposez pour changer</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Cliquez ou glissez-déposez</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG ou GIF (max. 5MB)</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input 
                    id="name" 
                    value={cv.content.personalInfo.name || ''}
                    onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Titre professionnel</Label>
                  <Input 
                    id="title" 
                    value={cv.content.personalInfo.title || ''}
                    onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={cv.content.personalInfo.email || ''}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input 
                    id="phone" 
                    value={cv.content.personalInfo.phone || ''}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input 
                    id="address" 
                    value={cv.content.personalInfo.address || ''}
                    onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="summary">Résumé professionnel</Label>
                  <Textarea 
                    id="summary" 
                    value={cv.content.personalInfo.summary || ''}
                    onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                    placeholder="Présentez-vous en quelques lignes. Décrivez votre parcours, vos compétences clés et ce que vous recherchez."
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Formation</CardTitle>
                <CardDescription>
                  Ajoutez vos diplômes et formations
                </CardDescription>
              </div>
              <Button onClick={addEducation} variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {cv.content.education.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucune formation ajoutée. Cliquez sur &apos;Ajouter&apos; pour commencer.
                </p>
              ) : (
                cv.content.education.map((edu: any, index: number) => (
                  <div key={edu.id} className="space-y-4 border-b pb-6 last:border-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Formation {index + 1}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeEducation(index)}
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Diplôme / Certification</Label>
                        <Input 
                          value={edu.degree || ''}
                          onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Établissement</Label>
                        <Input 
                          value={edu.institution || ''}
                          onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Lieu</Label>
                        <Input 
                          value={edu.location || ''}
                          onChange={(e) => updateEducation(index, 'location', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label>Date de début</Label>
                          <Input 
                            value={edu.startDate || ''}
                            onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                            placeholder="MM/AAAA"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Date de fin</Label>
                          <Input 
                            value={edu.endDate || ''}
                            onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                            placeholder="MM/AAAA ou Présent"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Description</Label>
                        <Textarea 
                          value={edu.description || ''}
                          onChange={(e) => updateEducation(index, 'description', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Expérience professionnelle</CardTitle>
                <CardDescription>
                  Ajoutez vos expériences professionnelles
                </CardDescription>
              </div>
              <Button onClick={addExperience} variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {cv.content.experience.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucune expérience ajoutée. Cliquez sur &apos;Ajouter&apos; pour commencer.
                </p>
              ) : (
                cv.content.experience.map((exp: any, index: number) => (
                  <div key={exp.id} className="space-y-4 border-b pb-6 last:border-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Expérience {index + 1}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeExperience(index)}
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Poste</Label>
                        <Input 
                          value={exp.position || ''}
                          onChange={(e) => updateExperience(index, 'position', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Entreprise</Label>
                        <Input 
                          value={exp.company || ''}
                          onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Lieu</Label>
                        <Input 
                          value={exp.location || ''}
                          onChange={(e) => updateExperience(index, 'location', e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label>Date de début</Label>
                          <Input 
                            value={exp.startDate || ''}
                            onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                            placeholder="MM/AAAA"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Date de fin</Label>
                          <Input 
                            value={exp.endDate || ''}
                            onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                            placeholder="MM/AAAA ou Présent"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Description</Label>
                        <Textarea 
                          value={exp.description || ''}
                          onChange={(e) => updateExperience(index, 'description', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Compétences</CardTitle>
                <CardDescription>
                  Ajoutez vos compétences techniques et professionnelles
                </CardDescription>
              </div>
              <Button onClick={addSkill} variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              {cv.content.skills.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucune compétence ajoutée. Cliquez sur &apos;Ajouter&apos; pour commencer.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cv.content.skills.map((skill: any, index: number) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <div className="flex-1">
                        <Input 
                          value={skill.name || ''}
                          onChange={(e) => updateSkill(index, 'name', e.target.value)}
                          placeholder="Ex: JavaScript"
                        />
                      </div>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[150px]"
                        value={skill.level || 'Intermédiaire'}
                        onChange={(e) => updateSkill(index, 'level', e.target.value)}
                      >
                        <option value="Débutant">Débutant</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Avancé">Avancé</option>
                        <option value="Expert">Expert</option>
                      </select>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeSkill(index)}
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="languages" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Langues</CardTitle>
                <CardDescription>
                  Ajoutez les langues que vous maîtrisez
                </CardDescription>
              </div>
              <Button onClick={addLanguage} variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent>
              {cv.content.languages.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucune langue ajoutée. Cliquez sur &apos;Ajouter&apos; pour commencer.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cv.content.languages.map((language: any, index: number) => (
                    <div key={language.id} className="flex items-center space-x-2">
                      <div className="flex-1">
                        <Input 
                          value={language.name || ''}
                          onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                          placeholder="Ex: Anglais"
                        />
                      </div>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[150px]"
                        value={language.level || 'Intermédiaire'}
                        onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                      >
                        <option value="Débutant">Débutant</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Avancé">Avancé</option>
                        <option value="Bilingue">Bilingue</option>
                        <option value="Langue maternelle">Langue maternelle</option>
                      </select>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeLanguage(index)}
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="references" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Références</CardTitle>
                <CardDescription>
                  Ajoutez des personnes qui peuvent recommander votre travail
                </CardDescription>
              </div>
              <Button onClick={addReference} variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {(!cv.content.references || cv.content.references.length === 0) ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucune référence ajoutée. Cliquez sur &apos;Ajouter&apos; pour commencer.
                </p>
              ) : (
                cv.content.references.map((reference: any, index: number) => (
                  <div key={reference.id} className="space-y-4 border-b pb-6 last:border-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Référence {index + 1}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeReference(index)}
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nom complet</Label>
                        <Input 
                          value={reference.name || ''}
                          onChange={(e) => updateReference(index, 'name', e.target.value)}
                          placeholder="Ex: Jean Dupont"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Titre / Poste</Label>
                        <Input 
                          value={reference.title || ''}
                          onChange={(e) => updateReference(index, 'title', e.target.value)}
                          placeholder="Ex: Directeur Technique"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Entreprise</Label>
                        <Input 
                          value={reference.company || ''}
                          onChange={(e) => updateReference(index, 'company', e.target.value)}
                          placeholder="Ex: Acme Inc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        
                        <Input 
                          type="email"
                          value={reference.email || ''}
                          onChange={(e) => updateReference(index, 'email', e.target.value)}
                          placeholder="Ex: jean.dupont@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Téléphone</Label>
                        <Input 
                          value={reference.phone || ''}
                          onChange={(e) => updateReference(index, 'phone', e.target.value)}
                          placeholder="Ex: +33 6 12 34 56 78"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        
        <TabsContent value="interests" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Hobbits</CardTitle>
                <CardDescription>
                  Ajoutez vos Centres d&apos;intérets
                </CardDescription>
              </div>
              <Button onClick={addHobbit} variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {(!cv.content.interests || cv.content.interests.length === 0) ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Aucun hobbit ajouté. Cliquez sur &apos;Ajouter&apos; pour commencer.
                </p>
              ) : (
                cv.content.interests.map((interests: any, index: number) => (
                  <div key={interests.id} className="space-y-4 border-b pb-6 last:border-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Hobbit {index + 1}</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeHobbit(index)}
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nom du Hobbit </Label>
                        <Input 
                          value={interests.name|| ''}
                          onChange={(e) => updateHobbit(index, 'name', e.target.value)}
                          placeholder="Ex: Voyage"
                        />
                      </div>
                    
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}