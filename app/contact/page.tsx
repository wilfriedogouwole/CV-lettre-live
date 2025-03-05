"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="mb-8">
       
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-muted-foreground text-lg">
            Notre équipe est là pour répondre à vos questions et vous aider dans votre démarche.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border">
              <h2 className="text-xl font-semibold mb-4">Nos coordonnées</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">contact@cvmaster.fr</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-muted-foreground">123 Avenue des Champs-Élysées</p>
                    <p className="text-muted-foreground">75008 Paris, France</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Horaires d&apos;ouverture</h2>
              <p className="text-muted-foreground mb-4">
                Notre équipe est disponible du lundi au vendredi, de 9h à 18h.
              </p>
              <p className="text-sm text-muted-foreground">
                Temps de réponse moyen : 24h ouvrées
              </p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-6">Envoyez-nous un message</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" placeholder="Votre nom" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="votre@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input id="subject" placeholder="Sujet de votre message" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Votre message..."
                  rows={6}
                />
              </div>
              <Button className="w-full">Envoyer le message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}