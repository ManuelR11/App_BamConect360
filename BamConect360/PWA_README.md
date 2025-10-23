# BamConect360 - Progressive Web App (PWA)

## 🚀 Características PWA Implementadas

### ✅ Funcionalidades Añadidas

1. **Instalable**: La aplicación se puede instalar como una app nativa en dispositivos móviles y escritorio
2. **Offline Ready**: Funciona sin conexión a internet gracias al Service Worker
3. **Cache Inteligente**: Cachea recursos estáticos y respuestas de API para mejorar el rendimiento
4. **Actualizaciones Automáticas**: Notifica cuando hay nuevas versiones disponibles
5. **Responsive**: Adaptable a diferentes tamaños de pantalla
6. **App-like Experience**: Se comporta como una aplicación nativa

### 📱 Instalación

#### En Móviles (Android/iOS):

1. Abre la app en el navegador
2. Busca el botón "Instalar App" en la esquina superior derecha
3. O usa el menú del navegador → "Añadir a pantalla de inicio"

#### En Escritorio (Chrome/Edge):

1. Abre la app en el navegador
2. Busca el ícono de instalación en la barra de direcciones
3. O usa el menú → "Instalar BamConect360"

### 🛠️ Desarrollo

#### Instalación de dependencias:

```bash
npm install
```

#### Modo desarrollo:

```bash
npm run dev
```

#### Construir para producción:

```bash
npm run build
```

#### Previsualizar build de producción:

```bash
npm run preview
```

### 📂 Archivos PWA Añadidos

- `public/manifest.json` - Configuración de la PWA
- `public/icons/` - Iconos de la aplicación en diferentes tamaños
- `src/Components/PWAUpdater.jsx` - Componente para notificaciones de actualización
- `src/Components/InstallPWA.jsx` - Componente para instalación de la PWA
- `sw.js` (generado automáticamente) - Service Worker para cache offline

### ⚙️ Configuración PWA

La configuración de la PWA se encuentra en:

- `vite.config.js` - Plugin de Vite PWA
- `public/manifest.json` - Manifest de la Web App

### 🎨 Personalización de Iconos

Los iconos actuales son placeholders. Para personalizar:

1. **Reemplaza los archivos PNG** en `public/icons/` con tus propios iconos
2. **Tamaños requeridos**: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
3. **Herramientas recomendadas**:
   - [Real Favicon Generator](https://realfavicongenerator.net/)
   - [PWA Builder Image Generator](https://www.pwabuilder.com/imageGenerator)

### 🌐 Características Técnicas

- **Cache Strategy**: NetworkFirst para APIs, CacheFirst para imágenes
- **Offline Support**: Funciona sin conexión gracias a Workbox
- **Auto-Update**: Detecta y notifica nuevas versiones automáticamente
- **Cross-Platform**: Compatible con iOS, Android, Windows, macOS, Linux

### 📊 Pruebas PWA

Para verificar que la PWA funciona correctamente:

1. **Chrome DevTools**:

   - F12 → Application → Service Workers
   - F12 → Lighthouse → Progressive Web App audit

2. **Tests offline**:
   - DevTools → Network → Throttling → Offline
   - La app debería seguir funcionando

### 🚀 Deploy

La aplicación está lista para ser desplegada en cualquier hosting que soporte archivos estáticos:

- Netlify
- Vercel
- Railway (ya configurado)
- GitHub Pages
- Firebase Hosting

### 📝 Notas Importantes

- **HTTPS Requerido**: Las PWAs solo funcionan en HTTPS (excepto localhost)
- **Service Worker**: Se registra automáticamente en producción
- **Cache Updates**: El cache se actualiza automáticamente con nuevas versiones
- **Browser Support**: Compatible con todos los navegadores modernos

---

## Rutas de la Aplicación

- `/` - Página de inicio
- `/guias` - Guías
- `/chatbot` - Chatbot
- `/soporte` - Soporte interno
- `/apertura-cuenta` - Apertura de cuenta
- `/admin-pdfs` - Gestión de PDFs

¡Tu aplicación BamConect360 ahora es una Progressive Web App completa! 🎉
