"use client"


export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="mb-8">
       
          <h1 className="text-4xl font-bold mb-4">Politique de confidentialité</h1>
          <p className="text-muted-foreground text-lg">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <h2>1. Collecte des données personnelles</h2>
          <p>
            Nous collectons les informations suivantes :
          </p>
          <ul>
            <li>Informations d&apos;identification (nom, prénom, email)</li>
            <li>Informations professionnelles (CV, expériences, compétences)</li>
            <li>Données de connexion et d&apos;utilisation du service</li>
          </ul>

          <h2>2. Utilisation des données</h2>
          <p>
            Vos données sont utilisées pour :
          </p>
          <ul>
            <li>Fournir et améliorer nos services</li>
            <li>Personnaliser votre expérience utilisateur</li>
            <li>Communiquer avec vous concernant votre compte</li>
            <li>Assurer la sécurité de nos services</li>
          </ul>

          <h2>3. Protection des données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés.
          </p>

          <h2>4. Partage des données</h2>
          <p>
            Nous ne partageons pas vos données personnelles avec des tiers, sauf :
          </p>
          <ul>
            <li>Avec votre consentement explicite</li>
            <li>Pour respecter une obligation légale</li>
            <li>Pour protéger nos droits et notre sécurité</li>
          </ul>

          <h2>5. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul>
            <li>Droit d&apos;accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d&apos;opposition</li>
          </ul>

          <h2>6. Cookies</h2>
          <p>
            Nous utilisons des cookies pour améliorer votre expérience sur notre site. Pour plus d&apos;informations, consultez notre politique sur les cookies.
          </p>

          <h2>7. Conservation des données</h2>
          <p>
            Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services ou respecter nos obligations légales.
          </p>

          <h2>8. Modifications de la politique</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.
          </p>

          <h2>9. Contact</h2>
          <p>
            Pour toute question concernant notre politique de confidentialité ou pour exercer vos droits, contactez-nous à : privacy@cvmaster.fr
          </p>
        </div>
      </div>
    </div>
  );
}