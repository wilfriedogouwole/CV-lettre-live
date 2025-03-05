"use client"


export default function ConditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="mb-8">
       
          <h1 className="text-4xl font-bold mb-4">Conditions d&apos;utilisation</h1>
          <p className="text-muted-foreground text-lg">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <h2>1. Acceptation des conditions</h2>
          <p>
            En accédant et en utilisant CV Master, vous acceptez d&apos;être lié par ces conditions d&apos;utilisation. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser notre service.
          </p>

          <h2>2. Description du service</h2>
          <p>
            CV Master est une plateforme en ligne permettant aux utilisateurs de créer, modifier et gérer leurs CV et lettres de motivation. Le service inclut des modèles, des outils d&apos;édition et des fonctionnalités de stockage.
          </p>

          <h2>3. Compte utilisateur</h2>
          <p>
            Pour utiliser certaines fonctionnalités du service, vous devez créer un compte. Vous êtes responsable du maintien de la confidentialité de vos informations de connexion et de toutes les activités qui se produisent sous votre compte.
          </p>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            Le contenu du site, y compris les textes, graphiques, logos, images, ainsi que leur compilation sont la propriété de CV Master ou de ses fournisseurs de contenu et sont protégés par les lois sur le droit d&apos;auteur.
          </p>

          <h2>5. Utilisation acceptable</h2>
          <p>
            Vous acceptez de ne pas utiliser le service pour :
          </p>
          <ul>
            <li>Violer des lois ou réglementations</li>
            <li>Enfreindre les droits de propriété intellectuelle</li>
            <li>Transmettre du contenu illégal ou préjudiciable</li>
            <li>Perturber le fonctionnement du service</li>
          </ul>

          <h2>6. Protection des données</h2>
          <p>
            Nous nous engageons à protéger vos données personnelles conformément à notre politique de confidentialité. Pour plus d&apos;informations, consultez notre page dédiée à la protection des données.
          </p>

          <h2>7. Modifications du service</h2>
          <p>
            Nous nous réservons le droit de modifier ou d&apos;interrompre temporairement ou définitivement le service sans préavis. Nous ne serons pas responsables envers vous ou un tiers pour toute modification, suspension ou interruption du service.
          </p>

          <h2>8. Limitation de responsabilité</h2>
          <p>
            CV Master ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le service.
          </p>

          <h2>9. Contact</h2>
          <p>
            Pour toute question concernant ces conditions d&apos;utilisation, veuillez nous contacter à l&apos;adresse suivante : contact@cvmaster.fr
          </p>
        </div>
      </div>
    </div>
  );
}