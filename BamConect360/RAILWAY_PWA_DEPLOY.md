# Deploy PWA en Railway - Guía Completa

## 🚀 Preparación para Deploy

### 1. Verificar archivos necesarios

Asegúrate de que tienes estos archivos:

- ✅ `Dockerfile` - Configuración de contenedor
- ✅ `railway.json` - Configuración de Railway
- ✅ `public/manifest.json` - Manifest de PWA
- ✅ `public/icons/` - Iconos de la app
- ✅ `vite.config.js` - Configuración PWA con Vite

### 2. Variables de entorno en Railway

Configura estas variables en Railway Dashboard:

```bash
NODE_ENV=production
PORT=3001
OPENAI_API_KEY=tu_api_key_aqui
MONGODB_URI=tu_mongodb_uri_aqui
FRONTEND_URL=https://tu-app.railway.app
```

### 3. Build Process

Railway ejecutará automáticamente:

1. `npm install` (frontend)
2. `npm install` (backend)
3. `npm run build` (construye la PWA)
4. Docker build con los archivos optimizados

## 📱 Características PWA que funcionarán en Railway

### ✅ Service Worker

- ✅ Cache offline automático
- ✅ Actualizaciones en background
- ✅ Notificaciones de nuevas versiones

### ✅ Instalabilidad

- ✅ Botón "Instalar App" en navegadores
- ✅ Añadir a pantalla de inicio (móviles)
- ✅ Instalación como app nativa (escritorio)

### ✅ Manifest Web App

- ✅ Iconos en todos los tamaños
- ✅ Splash screen personalizada
- ✅ Modo standalone (sin barra de navegador)

### ✅ HTTPS Automático

- ✅ Railway proporciona HTTPS automáticamente
- ✅ Service Workers funcionan correctamente
- ✅ PWA totalmente funcional

## 🔧 Headers Específicos Configurados

El servidor ya está configurado para servir correctamente:

```javascript
// Manifest con headers correctos
app.get("/manifest.json", (req, res) => {
	res.setHeader("Content-Type", "application/manifest+json");
	res.setHeader("Cache-Control", "public, max-age=604800");
	res.sendFile(path.join(frontendPath, "manifest.json"));
});

// Service Worker sin cache
app.get("/sw.js", (req, res) => {
	res.setHeader("Content-Type", "application/javascript");
	res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
	res.setHeader("Service-Worker-Allowed", "/");
	res.sendFile(path.join(frontendPath, "sw.js"));
});
```

## 🚀 Deploy Steps

### 1. Commit y Push

```bash
git add .
git commit -m "feat: PWA implementation with offline support"
git push origin main
```

### 2. Railway Auto-Deploy

Railway detectará automáticamente los cambios y:

- Construirá la imagen Docker
- Instalará dependencias
- Construirá la PWA
- Desplegará la aplicación

### 3. Verificar PWA

Una vez desplegado, verifica:

- 📱 Botón de instalación visible
- 🌐 Funciona offline
- ⚡ Carga rápida (cache)
- 🔔 Notificaciones de actualización

## 📊 Testing PWA en Producción

### Chrome DevTools:

1. F12 → Application → Service Workers
2. F12 → Application → Manifest
3. F12 → Lighthouse → PWA Audit

### Test Offline:

1. DevTools → Network → Throttling → Offline
2. Recargar página - debe seguir funcionando
3. Navegar entre rutas - debe funcionar sin conexión

### Test Instalación:

1. Chrome: Ícono de instalación en barra de direcciones
2. Mobile: "Añadir a pantalla de inicio"
3. Desktop: Menú → "Instalar BamConect360"

## 🎯 Puntuación PWA Esperada

Con esta configuración, tu app debería obtener:

- ✅ 100/100 en PWA Lighthouse
- ✅ Installable
- ✅ Works Offline
- ✅ Fast and Reliable
- ✅ Engaging

## 🔍 Troubleshooting

### Si no aparece el botón de instalación:

1. Verificar HTTPS (Railway lo proporciona automáticamente)
2. Verificar manifest.json en `/manifest.json`
3. Verificar service worker en `/sw.js`
4. Comprobar iconos en `/icons/`

### Si no funciona offline:

1. Verificar service worker registrado
2. Comprobar cache en DevTools → Application → Storage
3. Verificar Network tab para requests interceptados

---

## ✨ Resultado Final

Tu app BamConect360 en Railway será:

- 🚀 Una PWA completa y funcional
- 📱 Instalable en cualquier dispositivo
- ⚡ Ultra rápida con cache inteligente
- 🌐 Funcional sin conexión
- 🔄 Auto-actualizable

¡Lista para usarse como una app nativa! 🎉
