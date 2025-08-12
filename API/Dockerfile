# Multi-stage build para Node.js API
# Etapa 1: Build
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies)
RUN npm ci

# Copiar código fuente
COPY . .

# Etapa 2: Producción
FROM node:18-alpine AS production

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S senacloud -u 1001

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copiar código fuente desde la etapa builder
COPY --from=builder --chown=senacloud:nodejs /app .

# Cambiar al usuario no-root
USER senacloud

# Exponer puerto 3000
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1

# Comando por defecto
CMD ["npm", "start"]

# Etiquetas de metadatos
LABEL maintainer="SenaCloud Team"
LABEL description="SenaCloud API Node.js Application"
LABEL version="1.0.0"