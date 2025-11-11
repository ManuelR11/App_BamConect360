#!/bin/bash

echo "🚀 Preparando deployment para Railway..."

# Verificar que el build del frontend exista
if [ ! -d "dist" ]; then
    echo "📦 Construyendo frontend..."
    npm run build
fi

# Verificar archivos críticos
echo "🔍 Verificando archivos críticos..."
ls -la dist/
ls -la backend/

# Mostrar información del entorno
echo "🌍 Información del entorno:"
echo "NODE_ENV: ${NODE_ENV}"
echo "PORT: ${PORT}"

echo "✅ Listo para deployment en Railway"
