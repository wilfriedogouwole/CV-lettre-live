# Étape 1 : Construction de l'application Next.js
FROM node:18-bullseye AS builder

# Installer les dépendances
RUN apt-get update && apt-get install -y python3 make g++ rustc cargo libssl1.1

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./ 
# Copier le dossier Prisma AVANT npm install
COPY prisma ./prisma/  

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Exécution de l'application Next.js
FROM node:18-bullseye AS runner

WORKDIR /app

ENV NODE_ENV=production

ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}


# Copier les fichiers essentiels
COPY --from=builder /app/package.json /app/package-lock.json ./ 
COPY --from=builder /app/.next ./.next 
COPY --from=builder /app/public ./public 
COPY --from=builder /app/node_modules ./node_modules 
COPY --from=builder /app/prisma ./prisma 
COPY --from=builder /app/start.sh /app/start.sh 

EXPOSE 3000

RUN chmod +x /app/start.sh

ENTRYPOINT ["/app/start.sh"]
