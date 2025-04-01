"use client"

import { EditCardDialog } from '@/components/Kaban/edit-card-dialog';
import { NewCardDialog } from '@/components/Kaban/new-card-dialog';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { fireConfetti } from '@/lib/confetti';
import { createKanbanCard, deleteAllKanbanCards, deleteKanbanCard, getKanbanCards, updateKanbanCard } from '@/lib/kanban-actions';
import { Copy, Loader2, MoreVertical } from "lucide-react";
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface Application {
  id: string;
  title: string;
  company: string;
  location: string;
  contractType: string;
  status: 'wishlist' | 'applied' | 'followup' | 'interview' | 'finished';
  date: string;
}


const columns = [
  { id: 'wishlist', title: 'Souhait', color: 'bg-gray-100' },
  { id: 'applied', title: "J'ai postulé", color: 'bg-green-100' },
  { id: 'followup', title: "J'ai relancé", color: 'bg-orange-100' },
  { id: 'interview', title: "J'ai un entretien", color: 'bg-blue-100' },
  { id: 'finished', title: "Procédure terminé", color: 'bg-red-400' }

];

export default function DashboardContent() {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const cards = await getKanbanCards();
        setApplications(cards.map(card => ({
          id: card.id,
          title: card.title,
          company: card.company,
          location: card.location || "",
          contractType: card.contractType || "",
          status: card.status as 'wishlist' | 'applied' | 'followup' | 'interview' | 'finished',
          date: new Date(card.date).toISOString().split('T')[0]
        })));
      } catch (error) {
        console.error('Error loading applications:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les candidatures",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadApplications();
  }, [toast]);

  const handleNewCard = async (status: 'wishlist' | 'applied' | 'followup' | 'interview' | 'finished', data: any) => {
    try {
      const card = await createKanbanCard({
        ...data,
        status
      });

      setApplications([...applications, {
        id: card.id,
        title: card.title,
        company: card.company,
        location: card.location || "",
        contractType: card.contractType || "",
        status: card.status as 'wishlist' | 'applied' | 'followup' | 'interview' | 'finished',
        date: new Date(card.date).toISOString().split('T')[0]
      }]);

      toast({
        title: "Succès",
        description: "Nouvelle candidature ajoutée"
      });

      fireConfetti();

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la candidature",
        variant: "destructive"
      });
    }
  };



  const handleDuplicateCard = async (application: Application) => {
    try {
      const { id, date, ...cardData } = application;
      const duplicatedCard = await createKanbanCard(cardData);

      setApplications([...applications, {
        id: duplicatedCard.id,
        title: duplicatedCard.title,
        company: duplicatedCard.company,
        location: duplicatedCard.location || "",
        contractType: duplicatedCard.contractType || "",
        status: duplicatedCard.status as 'wishlist' | 'applied' | 'followup' | 'interview',
        date: new Date(duplicatedCard.date).toISOString().split('T')[0]
      }]);

      toast({
        title: "Succès",
        description: "La candidature a été dupliquée"
      });
      
      fireConfetti();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de dupliquer la candidature",
        variant: "destructive"
      });
    }
  };

  const handleEditCard = async (id: string, data: any) => {
    try {
      const updatedCard = await updateKanbanCard(id, data);
      setApplications(applications.map(app => 
        app.id === id ? {
          ...app,
          title: updatedCard.title,
          company: updatedCard.company,
          location: updatedCard.location || "",
          contractType: updatedCard.contractType || "",
        } : app
      ));
      toast({
        title: "Succès",
        description: "La candidature a été modifiée"
      });
      fireConfetti();

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la candidature",
        variant: "destructive"
      });
    }
  };

  const handleDeleteCard = async (id: string) => {
    try {
      await deleteKanbanCard(id);
      setApplications(applications.filter(app => app.id !== id));
      toast({
        title: "Succès",
        description: "La candidature a été supprimée"
      });
      fireConfetti();

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la candidature",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAll = async (status: string) => {
    try {
      await deleteAllKanbanCards(status);
      setApplications(applications.filter(app => app.status !== status));
      toast({
        title: "Succès",
        description: "Toutes les candidatures ont été supprimées"
      });
      fireConfetti();

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer les candidatures",
        variant: "destructive"
      });
    }
  };

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    try {
      await updateKanbanCard(draggableId, {
        status: destination.droppableId as 'wishlist' | 'applied' | 'followup' | 'interview' | 'finished'
      });

      const newApplications = Array.from(applications);
      const [movedApplication] = newApplications.filter(app => app.id === draggableId);
      movedApplication.status = destination.droppableId as 'wishlist' | 'applied' | 'followup' | 'interview';
      
      setApplications(newApplications);

      toast({
        title: "Succès",
        description: "Candidature mise à jour"
      });
      fireConfetti();

    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la candidature",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
          <TabsContent value="applications" className="space-y-4">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
                {columns.map(column => (
                  <div key={column.id} className={`${column.color} rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <h2 className="text-lg font-semibold">{column.title}</h2>
                        <span className="bg-white px-2 py-1 rounded-full text-sm">
                          {applications.filter(app => app.status === column.id).length}
                        </span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleDeleteAll(column.id)}>
                            Tout supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`min-h-[200px] space-y-2 transition-colors ${
                            snapshot.isDraggingOver ? 'bg-gray-50/50' : ''
                          }`}
                        >
                          {applications
                            .filter(app => app.status === column.id)
                            .map((application, index) => (
                              <Draggable
                                key={application.id}
                                draggableId={application.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      transform: snapshot.isDragging ? provided.draggableProps.style?.transform : 'none',
                                    }}
                                  >
                                    <div
                                      {...provided.dragHandleProps}
                                      className={`transition-all ${
                                        snapshot.isDragging ? 'rotate-1 scale-105' : ''
                                      }`}
                                    >
                                      <Card className="bg-white hover:shadow-md transition-shadow">
                                        <CardHeader className="p-3">
                                          <CardTitle className="text-sm font-medium">🧑🏻‍💼 POSTE : {application.title}</CardTitle>
                                          <p className="text-sm text-gray-500">🏢 ENTREPRISE : {application.company}</p>
                                        </CardHeader>
                                        <CardContent className="p-3 pt-0">
                                          <div className="space-y-1">
                                            {application.location && (
                                              <p className="text-xs text-gray-500">📍 LIEU : {application.location}</p>
                                            )}
                                            {application.contractType && (
                                              <p className="text-xs text-gray-500">📄 CONTRAT : {application.contractType}</p>
                                            )}
                                            <div className="flex justify-between items-center mt-2">
                                              <p className="text-xs text-gray-400">{application.date}</p>
                                              <div className="flex items-center space-x-2">
                                              <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDuplicateCard(application);
                                                  }}
                                                  className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
                                                >
                                                  <Copy className="h-3 w-4" />
                                                </button>


                                                <EditCardDialog
                                                  card={application}
                                                  onSubmit={handleEditCard}
                                                />
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteCard(application.id);
                                                  }}
                                                  className="text-xs text-red-800 hover:text-blue-600 transition-colors"
                                                >
                                                  Supprimer
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                          
                          <NewCardDialog 
                            onSubmit={(data) => handleNewCard(column.id as any, data)}
                            status={column.id}
                          />
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
          </TabsContent>
        
      
    </>
  );
}