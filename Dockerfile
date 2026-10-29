# Dockerfile para Next.js 16 (App Router) - Produção
# Base: Node 20 Alpine (leve e seguro)

# ============================================
# Stage 1: Base / Dependencies
# ============================================
FROM node:20-alpine AS base

# Instalar dependências do sistema (para Prisma, bcrypt, etc.)
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copiar apenas package files para cache de layers
COPY package.json package-lock.json* ./

# ============================================
# Stage 2: Install dependencies
# ============================================
FROM base AS deps

# Instalar dependências de produção
RUN npm ci --only=production --legacy-peer-deps

# ============================================
# Stage 3: Build
# ============================================
FROM base AS builder

# Instalar TODAS as dependências (incluindo dev para build)
RUN npm ci --legacy-peer-deps

# Copiar código fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Build da aplicação Next.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ============================================
# Stage 4: Runner (Produção)
# ============================================
FROM node:20-alpine AS runner

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

# Copiar apenas o necessário para produção
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copiar Prisma Client gerado e schema
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

# Variáveis de ambiente
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Usuário não-root
USER nextjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Iniciar servidor Next.js standalone
CMD ["node", "server.js"]