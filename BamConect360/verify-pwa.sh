#!/bin/bash

echo "🔍 Verificando configuración PWA para Railway..."

# Verificar archivos PWA esenciales
echo "📁 Verificando archivos esenciales..."

files=(
    "public/manifest.json"
    "public/icons"
    "vite.config.js"
    "Dockerfile"
    "railway.json"
    "backend/server.js"
)

for file in "${files[@]}"; do
    if [ -e "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - FALTANTE"
        exit 1
    fi
done

# Verificar que el build funcione
echo "🏗️ Verificando build..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build exitoso"
else
    echo "❌ Build falló"
    exit 1
fi

# Verificar archivos generados
echo "📦 Verificando archivos PWA generados..."
pwa_files=(
    "dist/manifest.webmanifest"
    "dist/sw.js"
    "dist/index.html"
)

for file in "${pwa_files[@]}"; do
    if [ -e "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - NO GENERADO"
        exit 1
    fi
done

# Verificar configuración Railway
echo "🚂 Verificando configuración Railway..."

if grep -q "dockerfile" railway.json; then
    echo "✅ Railway configurado para Dockerfile"
else
    echo "❌ Railway no configurado correctamente"
    exit 1
fi

# Verificar dependencias PWA
echo "📦 Verificando dependencias PWA..."
if npm list vite-plugin-pwa > /dev/null 2>&1; then
    echo "✅ vite-plugin-pwa instalado"
else
    echo "❌ vite-plugin-pwa no instalado"
    exit 1
fi

if npm list workbox-window > /dev/null 2>&1; then
    echo "✅ workbox-window instalado"
else
    echo "❌ workbox-window no instalado"
    exit 1
fi

echo ""
echo "🎉 ¡Todo listo para deploy en Railway!"
echo ""
echo "📋 Próximos pasos:"
echo "1. git add ."
echo "2. git commit -m 'feat: PWA ready for Railway deploy'"
echo "3. git push origin main"
echo ""
echo "🚀 Railway automáticamente:"
echo "   • Detectará los cambios"
echo "   • Construirá la imagen Docker"
echo "   • Desplegará tu PWA"
echo ""
echo "📱 Tu PWA estará lista en: https://tu-app.railway.app"
