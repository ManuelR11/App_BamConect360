# Usar Node.js 18 LTS
FROM node:18-alpine

# Crear directorio de la aplicación
WORKDIR /app

# Copiar package.json y package-lock.json desde la carpeta backend
COPY backend/package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar el código fuente del backend
COPY backend/ .

# Crear directorio para uploads
RUN mkdir -p uploads

# Exponer el puerto que Railway usará
EXPOSE $PORT

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
