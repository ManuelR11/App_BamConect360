# 🚂 Guía de Despliegue en Railway

## 📋 **Pasos para desplegar en Railway:**

### 1. **Preparar MongoDB Atlas (GRATIS)**

- Ve a: https://www.mongodb.com/cloud/atlas
- Crea cuenta y cluster gratuito (M0 Sandbox)
- Configura usuario y permite acceso desde anywhere
- Copia la connection string

### 2. **Crear cuenta en Railway**

- Ve a: https://railway.app
- Regístrate con GitHub
- Conecta tu repositorio

### 3. **Configurar el proyecto**

- New Project > Deploy from GitHub repo
- Selecciona tu repositorio BamConect360
- Railway detectará automáticamente el Dockerfile

### 4. **Configurar variables de entorno**

En Railway dashboard, ve a Variables y agrega:

```
PORT=3001
NODE_ENV=production
MONGODB_URI=tu_connection_string_de_atlas
OPENAI_API_KEY=tu_api_key_de_openai
MAX_FILE_SIZE=10MB
ALLOWED_FILE_TYPES=application/pdf
OPENAI_MODEL=gpt-3.5-turbo
MAX_TOKENS=1000
```

### 5. **Deploy automático**

- Railway construirá y desplegará automáticamente
- Te dará una URL como: `https://tu-proyecto.railway.app`

### 6. **Actualizar frontend**

- Cambia la URL en PDFManager.jsx y Chatbot.jsx
- Reemplaza `tu-backend-railway.railway.app` con tu URL real
- Construye y redespliega en Firebase: `npm run build && firebase deploy --only hosting`

## 💰 **Límites GRATUITOS de Railway:**

- $5 USD de crédito/mes
- 500 horas de ejecución/mes
- Perfecto para proyectos pequeños

## 🔄 **Deploy automático:**

- Cada push a main = deploy automático
- Logs en tiempo real
- Fácil rollback

## 🌍 **URLs finales:**

- **Frontend**: https://bamconecta360.web.app
- **Backend**: https://tu-proyecto.railway.app
- **API**: https://tu-proyecto.railway.app/api

## ⚡ **Beneficios:**

- ✅ Deploy en segundos
- ✅ HTTPS automático
- ✅ Escalabilidad automática
- ✅ Logs integrados
- ✅ Variables de entorno seguras
