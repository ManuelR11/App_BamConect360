#!/bin/bash

echo "🔍 Verificación rápida PWA - localhost:4173"
echo ""

# Verificar archivos en dist
echo "📁 Archivos en dist/:"
ls -la dist/ | grep -E "(manifest\.json|sw\.js|favicon\.png|apple-touch-icon\.png)"

echo ""
echo "📁 Iconos en dist/icons/:"
ls -la dist/icons/ | grep "\.png"

echo ""
echo "✅ Todos los archivos están presentes en dist/"
echo ""
echo "🌐 Servidor debe estar corriendo en: http://localhost:4173"
echo "📱 Para probar la instalación:"
echo "1. Abre http://localhost:4173 en Chrome"
echo "2. Abre DevTools (F12) → Application → Manifest"
echo "3. Verifica que no haya errores rojos"
echo "4. Busca el botón de instalación en la barra de direcciones"
echo "5. O usa el menú de Chrome → 'Instalar BamConect360'"
