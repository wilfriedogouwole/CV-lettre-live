"use client"


export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="mb-8">
          
          <h1 className="text-4xl font-bold mb-4">Politique de cookies</h1>
          <p className="text-muted-foreground text-lg">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <h2>1. Qu&apos;est-ce qu&apos;un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Les cookies sont largement utilisés pour faire fonctionner les sites web ou les rendre plus efficaces, ainsi que pour fournir des informations aux propriétaires du site.
          </p>

          <h2>2. Comment utilisons-nous les cookies ?</h2>
          <p>
            Nous utilisons différents types de cookies pour les finalités suivantes :
          </p>
          <ul>
            <li>Cookies essentiels : nécessaires au fonctionnement du site</li>
            <li>Cookies de performance : pour analyser l&apos;utilisation du site</li>
            <li>Cookies de fonctionnalité : pour personnaliser votre expérience</li>
            <li>Cookies de ciblage : pour vous montrer du contenu pertinent</li>
          </ul>

          <h2>3. Types de cookies utilisés</h2>
          <h3>Cookies essentiels</h3>
          <ul>
            <li>Session d&apos;authentification</li>
            <li>Sécurité</li>
            <li>Fonctionnalités de base du site</li>
          </ul>

          <h3>Cookies de performance</h3>
          <ul>
            <li>Google Analytics</li>
            <li>Statistiques d&apos;utilisation</li>
            <li>Amélioration des performances</li>
          </ul>

          <h3>Cookies de fonctionnalité</h3>
          <ul>
            <li>Préférences de langue</li>
            <li>Thème choisi</li>
            <li>Dernières actions</li>
          </ul>

          <h2>4. Gestion des cookies</h2>
          <p>
            Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies déjà présents sur votre ordinateur et paramétrer la plupart des navigateurs pour les bloquer. Toutefois, dans ce cas, vous devrez peut-être ajuster manuellement certaines préférences à chaque visite sur un site, et certains services et fonctionnalités pourraient ne pas fonctionner.
          </p>

          <h2>5. Comment désactiver les cookies ?</h2>
          <p>
            Pour désactiver les cookies, vous pouvez :
          </p>
          <ul>
            <li>Modifier les paramètres de votre navigateur</li>
            <li>Utiliser les outils de gestion des cookies de votre navigateur</li>
            <li>Utiliser des outils tiers de gestion des cookies</li>
          </ul>

          <h2>6. Impact de la désactivation des cookies</h2>
          <p>
            La désactivation de certains cookies peut affecter votre expérience sur notre site :
          </p>
          <ul>
            <li>Impossibilité de rester connecté</li>
            <li>Perte des préférences personnalisées</li>
            <li>Fonctionnalités limitées</li>
          </ul>

          <h2>7. Mises à jour de la politique</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de cookies à tout moment. Toute modification prendra effet immédiatement après sa publication sur le site.
          </p>

          <h2>8. Contact</h2>
          <p>
            Pour toute question concernant notre utilisation des cookies, contactez-nous à : cookies@cvmaster.fr
          </p>
        </div>
      </div>
    </div>
  );
}