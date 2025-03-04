#!/bin/sh -ex

echo "📦 Vérification de la connexion à la base de données..."
until npx prisma db push; do
  echo "⏳ En attente de la base de données..."
  sleep 2
done

echo "🚀 Exécution des migrations Prisma..."

# Résoudre les migrations qui ont échoué précédemment
npx prisma migrate resolve --applied "20250303183159_init" || true

# Appliquer les nouvelles migrations
npx prisma migrate deploy

echo "✅ Démarrage de l'application Next.js..."
exec npm run start
