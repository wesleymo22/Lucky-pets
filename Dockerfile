# Etapa de build
FROM node:20-alpine AS builder
WORKDIR /app

# Copia apenas o package.json primeiro (cache otimizado)
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera o Prisma Client compatível com Alpine
RUN npx prisma generate

# Compila o projeto
RUN npm run build

# Etapa final
FROM node:20-alpine
WORKDIR /app

# Instala dependências necessárias (openssl para Prisma)
RUN apk add --no-cache openssl

# Copia arquivos do builder
COPY --from=builder /app .

EXPOSE 3000

# Comando padrão
CMD ["npm", "run", "start:dev"]
