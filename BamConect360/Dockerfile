# Usar Node.js 20 LTS
FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json para instalar dependencias
COPY deploy-package.json package.json

# Instalar dependencias de producción
RUN npm install --only=production

# Copiar el servidor simple
COPY simple-server.js .

# Crear directorio uploads por si es necesario
RUN mkdir -p uploads

# El puerto lo maneja Railway dinámicamente
EXPOSE $PORT

# Ejecutar el servidor
CMD ["node", "simple-server.js"]
