#!/bin/bash

echo "🔍 Verificando iconos PWA..."

# URL base (cambiar por tu URL de Railway cuando deploys)
BASE_URL="http://localhost:4173"

# Verificar manifest.json
echo "📋 Verificando manifest.json..."
curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/manifest.json" | grep -q "200" && echo "✅ manifest.json" || echo "❌ manifest.json"

# Verificar iconos
echo "🎨 Verificando iconos..."
icons=("72x72" "96x96" "128x128" "144x144" "152x152" "192x192" "384x384" "512x512")

for size in "${icons[@]}"; do
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/icons/icon-$size.png")
    if [ "$response" = "200" ]; then
        echo "✅ icon-$size.png"
    else
        echo "❌ icon-$size.png (HTTP $response)"
    fi
done

# Verificar favicon y apple-touch-icon
echo "📱 Verificando iconos adicionales..."
curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/favicon.png" | grep -q "200" && echo "✅ favicon.png" || echo "❌ favicon.png"
curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/apple-touch-icon.png" | grep -q "200" && echo "✅ apple-touch-icon.png" || echo "❌ apple-touch-icon.png"

# Verificar service worker
echo "⚙️ Verificando service worker..."
curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/sw.js" | grep -q "200" && echo "✅ sw.js" || echo "❌ sw.js"

echo ""
echo "🎯 Para probar la instalación:"
echo "1. Abre Chrome DevTools (F12)"
echo "2. Ve a Application → Manifest"
echo "3. Verifica que no haya errores"
echo "4. Ve a Application → Service Workers"
echo "5. Verifica que el SW esté registrado"
echo "6. Busca el botón de instalación en la barra de direcciones"
echo ""
echo "🌐 Accede a: $BASE_URL"
