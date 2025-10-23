# 🚀 BamConect360 - Railway Deployment Guide

## 📋 Pasos para desplegar en Railway

### 1. **Preparar el repositorio**

```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### 2. **Configurar Railway**

1. Ve a [railway.app](https://railway.app)
2. Conecta tu repositorio de GitHub
3. Railway detectará automáticamente el Dockerfile

### 3. **Configurar variables de entorno**

En Railway dashboard, ve a Variables y agrega:

```env
NODE_ENV=production
OPENAI_API_KEY=tu_api_key_de_openai
MONGODB_URI=tu_uri_de_mongodb
OPENAI_MODEL=gpt-3.5-turbo
MAX_TOKENS=1000
```

### 4. **MongoDB Setup**

- Usa MongoDB Atlas (gratis): https://mongodb.com/atlas
- O agrega Railway MongoDB desde Add-ons
- Copia la URI de conexión a MONGODB_URI

### 5. **Deploy**

- Railway construirá automáticamente usando Docker
- Te dará una URL como: `https://tu-proyecto.railway.app`

## 🛠️ Desarrollo Local

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
npm run dev
```

### Full Stack

```bash
npm run backend:dev  # Terminal 1
npm run dev          # Terminal 2
```

## 📦 Estructura del Proyecto

```
├── backend/           # Servidor Express + OpenAI
├── src/              # Frontend React
├── dist/             # Build de producción
├── Dockerfile        # Configuración Docker
└── railway.json      # Configuración Railway
```

## 🔧 Características

- ✅ Chatbot con OpenAI
- ✅ Upload y procesamiento de PDFs
- ✅ Gestión de documentos
- ✅ Frontend React + Backend Express
- ✅ Docker optimizado para Railway
- ✅ Sin dependencias de Firebase

## 🌐 URLs de Producción

- **Frontend + Backend**: https://tu-proyecto.railway.app
- **API Health**: https://tu-proyecto.railway.app/api/health
- **Admin PDFs**: https://tu-proyecto.railway.app/admin-pdfs+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
