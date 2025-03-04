import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, FileText, Lightbulb, PenLine, Users } from "lucide-react";

export default function ConseilsPage() {
  return (
    <div className="container mx-au
    to py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Conseils pour réussir votre recherche d&apos;emploi</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Découvrez nos conseils d&apos;experts pour optimiser votre CV, rédiger des lettres de motivation percutantes et réussir vos entretiens.
        </p>
      </div>

      <Tabs defaultValue="cv" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="cv" className="flex items-center gap-2 py-3">
            <FileText className="h-4 w-4" />
            <span>CV</span>
          </TabsTrigger>
          <TabsTrigger value="lettres" className="flex items-center gap-2 py-3">
            <PenLine className="h-4 w-4" />
            <span>Lettres de motivation</span>
          </TabsTrigger>
          <TabsTrigger value="entretiens" className="flex items-center gap-2 py-3">
            <Users className="h-4 w-4" />
            <span>Entretiens</span>
          </TabsTrigger>
          <TabsTrigger value="recherche" className="flex items-center gap-2 py-3">
            <Briefcase className="h-4 w-4" />
            <span>Recherche d&apos;emploi</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cv" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Structure efficace d&apos;un CV</CardTitle>
                <CardDescription>Les sections essentielles pour un CV impactant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">1. En-tête clair et professionnel</h3>
                  <p className="text-muted-foreground">
                    Incluez votre nom, coordonnées, titre professionnel et éventuellement un lien vers votre profil LinkedIn.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">2. Résumé ou profil professionnel</h3>
                  <p className="text-muted-foreground">
                    Un court paragraphe de 3-4 lignes résumant votre parcours, vos compétences clés et ce que vous recherchez.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">3. Expérience professionnelle</h3>
                  <p className="text-muted-foreground">
                    Présentez vos expériences de la plus récente à la plus ancienne, avec des résultats quantifiables.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">4. Formation</h3>
                  <p className="text-muted-foreground">
                    Mentionnez vos diplômes, certifications et formations pertinentes pour le poste visé.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">5. Compétences</h3>
                  <p className="text-muted-foreground">
                    Listez vos compétences techniques et transversales en lien avec le poste.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Les erreurs à éviter</CardTitle>
                <CardDescription>Ce qu&apos;il ne faut pas faire dans votre CV</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">1. Un CV trop long</h3>
                  <p className="text-muted-foreground">
                    Limitez-vous à 1-2 pages maximum. Les recruteurs passent en moyenne 6-7 secondes sur un CV.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">2. Des informations obsolètes</h3>
                  <p className="text-muted-foreground">
                    Ne gardez que les expériences pertinentes des 10-15 dernières années.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">3. Des descriptions vagues</h3>
                  <p className="text-muted-foreground">
                    Évitez les généralités, privilégiez les réalisations concrètes et chiffrées.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">4. Des fautes d&apos;orthographe</h3>
                  <p className="text-muted-foreground">
                    Relisez-vous plusieurs fois et faites relire votre CV par une autre personne.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">5. Un design surchargé</h3>
                  <p className="text-muted-foreground">
                    Privilégiez un design sobre et professionnel, adapté à votre secteur d&apos;activité.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card >
            <CardHeader>
              
              <CardTitle>Adapter son CV à l&apos;offre d&apos;emploi</CardTitle>
           
              <CardDescription>Comment personnaliser votre CV pour chaque candidature</CardDescription>
              <br/>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">1. Analysez l&apos;offre d&apos;emploi</h3>
                <p className="text-muted-foreground">
                  Identifiez les mots-clés, compétences et qualités recherchées par le recruteur.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">2. Adaptez votre titre et résumé</h3>
                <p className="text-muted-foreground">
                  Modifiez votre titre professionnel et votre résumé pour qu&apos;ils correspondent au poste visé.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">3. Réorganisez vos expériences</h3>
                <p className="text-muted-foreground">
                  Mettez en avant les expériences les plus pertinentes pour le poste et adaptez les descriptions.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">4. Ajustez vos compétences</h3>
                <p className="text-muted-foreground">
                  Réorganisez vos compétences pour mettre en premier celles qui sont mentionnées dans l&apos;offre.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">5. Utilisez les bons mots-clés</h3>
                <p className="text-muted-foreground">
                  Intégrez les termes spécifiques du secteur et ceux utilisés dans l&apos;offre d&apos;emploi.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lettres" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Structure d&apos;une lettre de motivation</CardTitle>
                <CardDescription>Les éléments clés d&apos;une lettre efficace</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">1. En-tête et formule d&apos;appel</h3>
                  <p className="text-muted-foreground">
                    Incluez vos coordonnées, la date, les coordonnées de l&apos;entreprise et une formule d&apos;appel personnalisée.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">2. Introduction accrocheuse</h3>
                  <p className="text-muted-foreground">
                    Présentez-vous brièvement et expliquez pourquoi vous postulez à ce poste spécifique.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">3. Développement : vous, l&apos;entreprise, le match</h3>
                  <p className="text-muted-foreground">
                    Expliquez ce que vous pouvez apporter à l&apos;entreprise et pourquoi vous êtes le candidat idéal.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">4. Conclusion et appel à l&apos;action</h3>
                  <p className="text-muted-foreground">
                    Réaffirmez votre intérêt et proposez un entretien pour discuter de votre candidature.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">5. Formule de politesse</h3>
                  <p className="text-muted-foreground">
                    Terminez par une formule de politesse professionnelle et votre signature.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personnaliser sa lettre de motivation</CardTitle>
                <CardDescription>Comment adapter votre lettre à chaque entreprise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">1. Recherchez l&apos;entreprise</h3>
                  <p className="text-muted-foreground">
                    Renseignez-vous sur l&apos;entreprise, sa culture, ses valeurs et ses projets récents.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">2. Identifiez le destinataire</h3>
                  <p className="text-muted-foreground">
                    Adressez votre lettre à une personne spécifique plutôt qu&apos;à &apos;Madame, Monsieur&apos;.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">3. Faites le lien avec l&apos;offre</h3>
                  <p className="text-muted-foreground">
                    Mentionnez des éléments spécifiques de l&apos;offre d&apos;emploi et expliquez comment vous y répondez.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">4. Montrez votre connaissance de l&apos;entreprise</h3>
                  <p className="text-muted-foreground">
                    Démontrez que vous connaissez l&apos;entreprise en mentionnant ses projets ou réalisations.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">5. Adaptez votre ton</h3>
                  <p className="text-muted-foreground">
                    Ajustez votre style d&apos;écriture à la culture de l&apos;entreprise (formel, dynamique, créatif...).
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Exemples de phrases d&apos;accroche</CardTitle>
              <CardDescription>Comment commencer votre lettre de motivation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Pour un poste dans votre domaine d&apos;expertise</h3>
                <p className="text-muted-foreground">
                &apos;Fort de X années d&apos;expérience dans le domaine de [secteur], je suis particulièrement intéressé par le poste de [intitulé] au sein de [entreprise], où je pourrai mettre à profit mon expertise en [compétence clé].&apos;
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Pour une reconversion professionnelle</h3>
                <p className="text-muted-foreground">
                &apos;Après X années d&apos;expérience en tant que [ancien poste], j&apos;ai développé des compétences transférables en [compétences] qui seraient particulièrement pertinentes pour le poste de [nouveau poste] au sein de votre entreprise.&apos;
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Pour un jeune diplômé</h3>
                <p className="text-muted-foreground">
                &apos;Récemment diplômé en [formation], je suis vivement intéressé par le poste de [intitulé] au sein de [entreprise]. Mon parcours académique et mes stages m&apos;ont permis de développer des compétences en [compétences] qui correspondent parfaitement aux exigences du poste.&apos;
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Suite à une recommandation</h3>
                <p className="text-muted-foreground">
                &apos;Sur les conseils de [nom], [poste] au sein de votre entreprise, je me permets de vous adresser ma candidature pour le poste de [intitulé]. [Nom] m&apos;a vanté la qualité de l&apos;environnement de travail et les projets innovants de [entreprise].&apos;
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Pour une candidature spontanée</h3>
                <p className="text-muted-foreground">
                &apos;Particulièrement intéressé par les activités de [entreprise] dans le domaine de [secteur], je souhaite vous proposer ma candidature spontanée pour un poste de [intitulé]. Votre entreprise se distingue par [caractéristique], ce qui correspond parfaitement à mes aspirations professionnelles.&apos;
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entretiens" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Préparer son entretien</CardTitle>
                <CardDescription>Les étapes clés pour réussir votre entretien</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">1. Recherchez l&apos;entreprise</h3>
                  <p className="text-muted-foreground">
                    Renseignez-vous sur l&apos;entreprise, son histoire, ses produits/services, sa culture et ses actualités récentes.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">2. Analysez le poste</h3>
                  <p className="text-muted-foreground">
                    Relisez l&apos;offre d&apos;emploi et identifiez les compétences et qualités recherchées.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">3. Préparez vos réponses</h3>
                  <p className="text-muted-foreground">
                    Anticipez les questions classiques et préparez des exemples concrets de vos réalisations.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">4. Préparez vos questions</h3>
                  <p className="text-muted-foreground">
                    Prévoyez des questions pertinentes à poser au recruteur sur le poste et l&apos;entreprise.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">5. Organisez la logistique</h3>
                  <p className="text-muted-foreground">
                    Préparez votre tenue, vérifiez l&apos;itinéraire ou la connexion pour un entretien à distance.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Questions fréquentes en entretien</CardTitle>
                <CardDescription>Comment y répondre efficacement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">1. &apos;Parlez-moi de vous&apos;</h3>
                  <p className="text-muted-foreground">
                    Présentez votre parcours professionnel de manière synthétique en lien avec le poste visé.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">2. &apos;Pourquoi voulez-vous travailler pour nous ?&apos;</h3>
                  <p className="text-muted-foreground">
                    Montrez votre connaissance de l&apos;entreprise et expliquez pourquoi ses valeurs vous correspondent.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">3. &apos;Quelles sont vos forces et faiblesses ?&apos;</h3>
                  <p className="text-muted-foreground">
                    Citez des forces pertinentes pour le poste et une faiblesse que vous travaillez à améliorer.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">4. &apos;Où vous voyez-vous dans 5 ans ?&apos;</h3>
                  <p className="text-muted-foreground">
                    Montrez votre ambition tout en restant réaliste et en lien avec l&apos;entreprise.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">5. &apos;Pourquoi devrions-nous vous embaucher ?&apos;</h3>
                  <p className="text-muted-foreground">
                    Résumez votre valeur ajoutée et ce qui vous distingue des autres candidats.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle> L&apos;entretien à distance</CardTitle>
              <CardDescription>Conseils pour réussir vos entretiens en visioconférence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">1. Préparez votre environnement</h3>
                <p className="text-muted-foreground">
                  Choisissez un lieu calme, bien éclairé, avec un fond neutre et professionnel.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">2. Testez votre matériel</h3>
                <p className="text-muted-foreground">
                  Vérifiez votre connexion internet, caméra, microphone et familiarisez-vous avec le logiciel utilisé.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">3. Soignez votre apparence</h3>
                <p className="text-muted-foreground">
                  Habillez-vous comme pour un entretien en présentiel, de la tête aux pieds.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">4. Adaptez votre communication</h3>
                <p className="text-muted-foreground">
                  Parlez clairement, regardez la caméra, évitez les gestes brusques et les distractions.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">5. Préparez des notes discrètes</h3>
                <p className="text-muted-foreground">
                  Profitez de l&apos;avantage d&apos;avoir des notes à portée de main, mais évitez de les lire constamment.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recherche" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Stratégies de recherche d&apos;emploi</CardTitle>
                <CardDescription>Comment optimiser votre recherche</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">1. Définissez votre projet professionnel</h3>
                  <p className="text-muted-foreground">
                    Clarifiez vos objectifs, vos compétences et le type de poste/secteur qui vous intéresse.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">2. Diversifiez vos canaux de recherche</h3>
                  <p className="text-muted-foreground">
                    Utilisez les job boards, réseaux sociaux professionnels, sites d&apos;entreprises et cabinets de recrutement.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">3. Activez votre réseau</h3>
                  <p className="text-muted-foreground">
                    Informez votre entourage professionnel et personnel de votre recherche d&apos;emploi.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">4. Créez des alertes emploi</h3>
                  <p className="text-muted-foreground">
                    Configurez des alertes sur les principaux sites d&apos;emploi avec vos critères de recherche.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">5. Organisez votre recherche</h3>
                  <p className="text-muted-foreground">
                    Tenez un tableau de bord de vos candidatures et fixez-vous des objectifs hebdomadaires.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Développer son réseau professionnel</CardTitle>
                <CardDescription>L&apos;importance du networking dans la recherche d&apos;emploi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">1. Optimisez votre profil LinkedIn</h3>
                  <p className="text-muted-foreground">
                    Complétez votre profil à 100%, utilisez des mots-clés pertinents et ajoutez une photo professionnelle.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">2. Participez à des événements professionnels</h3>
                  <p className="text-muted-foreground">
                    Assistez à des salons, conférences et webinaires dans votre secteur d&apos;activité.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">3. Rejoignez des groupes et associations</h3>
                  <p className="text-muted-foreground">
                    Intégrez des groupes LinkedIn et des associations professionnelles de votre secteur.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">4. Pratiquez l&apos;informational interview</h3>
                  <p className="text-muted-foreground">
                    Sollicitez des professionnels pour des entretiens informatifs sur leur métier ou secteur.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">5. Entretenez votre réseau</h3>
                  <p className="text-muted-foreground">
                    Restez en contact régulier avec vos relations professionnelles, même hors période de recherche.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Se démarquer dans sa candidature</CardTitle>
              <CardDescription>Comment sortir du lot face à la concurrence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">1. Personnalisez chaque candidature</h3>
                <p className="text-muted-foreground">
                  Adaptez votre CV et lettre de motivation à chaque offre d&apos;emploi et entreprise.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">2. Mettez en avant vos réalisations</h3>
                <p className="text-muted-foreground">
                  Quantifiez vos résultats et expliquez comment vous avez fait la différence dans vos précédents postes.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">3. Développez votre marque personnelle</h3>
                <p className="text-muted-foreground">
                  Créez un portfolio en ligne, un blog ou partagez du contenu professionnel sur les réseaux sociaux.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">4. Faites du suivi</h3>
                <p className="text-muted-foreground">
                  Relancez après l&apos;envoi de votre candidature et après un entretien pour montrer votre motivation.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">5. Investissez dans votre développement</h3>
                <p className="text-muted-foreground">
                  Suivez des formations, obtenez des certifications et restez à jour dans votre domaine.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-16 text-center">
        <div className="inline-block bg-primary/10 p-4 rounded-full mb-6">
          <Lightbulb className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Besoin de plus de conseils personnalisés ?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Créez un compte pour accéder à des conseils personnalisés en fonction de votre profil et du poste que vous visez.
        </p>
      </div>
    </div>
  );
}