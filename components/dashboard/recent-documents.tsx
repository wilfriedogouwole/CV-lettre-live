"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { ExternalLink, FileText, PenLine, Send } from "lucide-react";
import Link from "next/link";

interface RecentDocumentsProps {
  cvs: any[];
  coverLetters: any[];
  applications: any[];
}

export function RecentDocuments({ cvs, coverLetters, applications }: RecentDocumentsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>CV récents</CardTitle>
          <CardDescription>
            Vos CV créés ou modifiés récemment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {cvs.length === 0 ? (
            <p className="text-sm text-muted-foreground">Vous n&apos;avez pas encore créé de CV.</p>
          ) : (
            <div className="space-y-4">
              {cvs.slice(0, 5).map((cv) => (
                <div key={cv.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium leading-none">{cv.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(cv.updatedAt), { addSuffix: true, locale: fr })}
                      </p>
                    </div>
                  </div>
                  <Link href={`/dashboard/cv/${cv.id}`}>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link href="/dashboard/cv">
                  <Button variant="outline" size="sm">
                    Voir tous mes CV
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Lettres récentes</CardTitle>
          <CardDescription>
            Vos lettres de motivation créées ou modifiées récemment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {coverLetters.length === 0 ? (
            <p className="text-sm text-muted-foreground">Vous n&apos;avez pas encore créé de lettre de motivation.</p>
          ) : (
            <div className="space-y-4">
              {coverLetters.slice(0, 5).map((letter) => (
                <div key={letter.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <PenLine className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium leading-none">{letter.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(letter.updatedAt), { addSuffix: true, locale: fr })}
                      </p>
                    </div>
                  </div>
                  <Link href={`/dashboard/letters/${letter.id}`}>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link href="/dashboard/letters">
                  <Button variant="outline" size="sm">
                    Voir toutes mes lettres
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Candidatures récentes</CardTitle>
          <CardDescription>
            Vos dernières candidatures envoyées
          </CardDescription>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <p className="text-sm text-muted-foreground">Vous n&apos;avez pas encore envoyé de candidature.</p>
          ) : (
            <div className="space-y-4">
              {applications.slice(0, 5).map((application) => (
                <div key={application.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Send className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium leading-none">{application.job.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {application.job.company} - {application.status}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(application.createdAt), { addSuffix: true, locale: fr })}
                      </p>
                    </div>
                  </div>
                  <Link href={`/jobs/${application.jobId}`}>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
              <div className="mt-4 text-center">
                <Link href="/jobs">
                  <Button variant="outline" size="sm">
                    Voir toutes les offres
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}