# Dockerfile simplificado para Railway
FROM node:20-alpine

# Instalar dependencias del sistema
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

# Copiar package.json y instalar dependencias
COPY BamConect360/package.json ./
COPY BamConect360/backend/package.json ./backend/

# Instalar dependencias del frontend
RUN npm install

# Instalar dependencias del backend
WORKDIR /app/backend
RUN npm install

# Crear archivo dummy para pdf-parse (solución temporal)
RUN mkdir -p /app/test/data
RUN echo "dummy content" > /app/test/data/05-versions-space.pdf

# Volver al directorio principal
WORKDIR /app

# Copiar código fuente
COPY BamConect360/ .

# Construir React
RUN npm run build

# Crear directorios necesarios
RUN mkdir -p uploads backend/uploads

# Exponer puerto
EXPOSE $PORT

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3001

# Comando de inicio
CMD ["node", "backend/server.js"]
