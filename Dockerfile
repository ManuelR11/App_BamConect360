# Multi-stage build para aplicación React + Node.js
FROM node:20-alpine AS builder

# Instalar dependencias del sistema necesarias para canvas
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json del frontend desde BamConect360
COPY BamConect360/package.json ./
COPY BamConect360/backend/package.json ./backend/

# Instalar dependencias del frontend
RUN npm install

# Instalar dependencias del backend
WORKDIR /app/backend
RUN npm install

# Volver al directorio principal
WORKDIR /app

# Copiar código fuente desde BamConect360
COPY BamConect360/ .

# Construir la aplicación React
RUN npm run build

# Stage 2: Producción
FROM node:20-alpine AS production

# Instalar dependencias del sistema para canvas en producción
RUN apk add --no-cache \
    cairo \
    jpeg \
    pango \
    musl \
    giflib \
    pixman \
    libjpeg-turbo \
    freetype

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S bamconect -u 1001

# Establecer directorio de trabajo
WORKDIR /app

# Copiar dependencias del backend
COPY --from=builder /app/backend/package.json ./backend/
COPY --from=builder /app/backend/node_modules ./backend/node_modules/
COPY --from=builder /app/backend/server.js ./backend/

# Copiar build del frontend
COPY --from=builder /app/dist ./frontend/

# Crear directorio uploads
RUN mkdir -p uploads && chown -R bamconect:nodejs uploads
RUN mkdir -p backend/uploads && chown -R bamconect:nodejs backend/uploads

# Cambiar propietario de archivos
RUN chown -R bamconect:nodejs /app

# Cambiar a usuario no-root
USER bamconect

# Exponer puerto
EXPOSE $PORT

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3001

# Comando de inicio
CMD ["node", "backend/server.js"]
