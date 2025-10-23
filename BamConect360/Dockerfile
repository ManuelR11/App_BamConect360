# Usar Node.js 20 LTS para compatibilidad con las dependencias
FROM node:20-alpine

# Crear directorio de la aplicación
WORKDIR /app

# Copiar solo los archivos necesarios del backend
COPY simple-server.js ./
COPY deploy-package.json ./package.json

# Instalar solo las dependencias necesarias
RUN npm install --only=production

# Crear directorio para uploads (si es necesario)
RUN mkdir -p uploads

# Exponer el puerto que Railway usará
EXPOSE $PORT

# Comando para ejecutar la aplicación directamente
CMD ["node", "simple-server.js"]
