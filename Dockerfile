# Étape 1 : Construction de l'application Next.js
FROM node:18-alpine AS builder

# Installer les dépendances nécessaires pour Rust et @tailwindcss/oxide
RUN apk add --no-cache python3 make g++ rust cargo

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json package-lock.json ./
# Copier le dossier prisma AVANT npm install
COPY prisma ./prisma/

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Exécution de l'application Next.js
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copier les fichiers essentiels de l'étape précédente
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/start.sh /app/start.sh

EXPOSE 3000

RUN chmod +x /app/start.sh

ENTRYPOINT ["/app/start.sh"]