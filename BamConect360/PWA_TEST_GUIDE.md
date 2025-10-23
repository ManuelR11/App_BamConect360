# 🔧 Guía de Pruebas PWA - Paso a Paso

## 📋 Estado Actual

✅ Iconos PNG reales generados (8 tamaños)
✅ Manifest.json configurado correctamente  
✅ Service Worker generado
✅ Favicon y apple-touch-icon creados
✅ Servidor corriendo en localhost:4173

## 🧪 Pasos para Probar la Instalación PWA

### 1. Abrir la Aplicación

- Ve a: **http://localhost:4173**
- La página debe cargar normalmente

### 2. Verificar en Chrome DevTools

1. Presiona **F12** para abrir DevTools
2. Ve a la pestaña **Application**
3. En el panel izquierdo, busca **Manifest**
4. Deberías ver:
   - ✅ Name: "BamConect360"
   - ✅ Start URL: "/"
   - ✅ Theme Color: #2563eb
   - ✅ Display: standalone
   - ✅ Icons: 4 iconos listados

### 3. Verificar Service Worker

1. En DevTools → **Application** → **Service Workers**
2. Deberías ver:
   - ✅ Source: sw.js
   - ✅ Status: Activated and is running
   - ✅ Scope: http://localhost:4173/

### 4. Buscar Botón de Instalación

Busca en estos lugares:

- **Barra de direcciones de Chrome**: Icono de instalación ⬇️
- **Menú de Chrome** (⋮) → "Instalar BamConect360"
- **Componente en la app**: Botón "📱 Instalar App" (esquina superior derecha)

### 5. Probar Instalación

1. Haz clic en el botón/icono de instalación
2. Confirma en el diálogo que aparece
3. La app se instalará como aplicación nativa

### 6. Verificar Funciones Offline

1. En DevTools → **Network** → **Throttling** → **Offline**
2. Recarga la página
3. La app debe seguir funcionando sin internet

## 🚨 Solución de Problemas

### Si no aparece el botón de instalación:

#### Verifica HTTPS (no aplica a localhost)

- ✅ localhost está exento de HTTPS

#### Verifica Lighthouse PWA Score

1. DevTools → **Lighthouse**
2. Selecciona **Progressive Web App**
3. Haz clic en **Generate report**
4. Debe obtener score alto (>80)

#### Verifica errores en Console

1. DevTools → **Console**
2. No debe haber errores rojos relacionados con SW o manifest

### Si el Service Worker no se registra:

1. Verifica que el archivo `sw.js` esté accesible
2. Recarga la página (Ctrl+F5)
3. Verifica en DevTools → Application → Service Workers

### Si los iconos fallan:

1. Ve a DevTools → **Network**
2. Recarga la página
3. Busca requests a `/icons/` que fallen
4. Todos deben retornar status 200

## ✅ Criterios de Éxito

Tu PWA está lista para Railway cuando:

- ✅ No hay errores en el manifest
- ✅ Service Worker está registrado y activo
- ✅ Iconos cargan correctamente (status 200)
- ✅ Aparece botón de instalación
- ✅ Funciona offline
- ✅ Lighthouse PWA score > 80

## 🚀 Cuando todo funcione en localhost

Ejecuta:

```bash
git add .
git commit -m "fix: PWA with real PNG icons - ready for install"
git push origin main
```

¡Railway automáticamente desplegará tu PWA funcional! 🎉
