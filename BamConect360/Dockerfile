# Usar Node.js 18 LTS
FROM node:18-alpine

# Crear directorio de la aplicación
WORKDIR /app

# Copiar package.json principal para postinstall
COPY package*.json ./

# Copiar package.json del backend
COPY backend/package*.json ./backend/

# Instalar dependencias del backend
RUN npm install

# Copiar el código fuente del backend
COPY backend/ ./backend/

# Crear directorio para uploads
RUN mkdir -p backend/uploads

# Exponer el puerto que Railway usará
EXPOSE $PORT

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
