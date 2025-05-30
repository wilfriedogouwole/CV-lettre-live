# Étape 1 : Construction de l'application Next.js
FROM node:18-bullseye AS builder

# Installer les dépendances système nécessaires pour Prisma
RUN apt-get update && apt-get install -y python3 make g++ rustc cargo libssl1.1

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./ 

# Copier le dossier Prisma avant d'installer les dépendances
COPY prisma ./prisma/

# Vérifier que Prisma a bien été copié
RUN ls -la ./prisma

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Ajouter des arguments de build pour DATABASE_URL
ARG DATABASE_URL
ARG DATABASE_URL
ARG STRIPE_SECRET_KEY
ARG STRIPE_WEBHOOK_SECRET

# Utiliser l'ARG dans votre configuration Prisma
ENV DATABASE_URL=$DATABASE_URL \
    STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY \
    NEXTAUTH_SECRET="default-secret-for-build" 

# Générer le client Prisma
RUN npx prisma generate

# Construire l'application
RUN npm run build

# Étape 2 : Exécution de l'application Next.js
FROM node:18-bullseye AS runner

WORKDIR /app

# Variables d'environnement sensibles seront injectées au moment de l'exécution
# Ne pas inclure directement les variables sensibles ici

# Copier les fichiers essentiels depuis le builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next 
COPY --from=builder /app/public ./public 
COPY --from=builder /app/node_modules ./node_modules 
COPY --from=builder /app/prisma ./prisma 
COPY --from=builder /app/start.sh /app/start.sh 

EXPOSE 3000

# Rendre le script start.sh exécutable
RUN chmod +x /app/start.sh

# Entrée du conteneur
ENTRYPOINT ["/app/start.sh"]