# Usar Node.js 20 LTS para compatibilidad con las dependencias
FROM node:20-alpine

# Crear directorio de la aplicación
WORKDIR /app

# Copiar el package.json limpio para deployment
COPY deploy-package.json ./package.json

# Instalar solo las dependencias del backend
RUN npm install --only=production

# Copiar el código fuente del backend
COPY backend/ ./

# Crear directorio para uploads
RUN mkdir -p uploads

# Exponer el puerto que Railway usará
EXPOSE $PORT

# Comando para ejecutar la aplicación directamente
CMD ["node", "server.js"]
