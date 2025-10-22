# BamConect360 - Chatbot con IA entrenado con PDFs

## 🎯 Descripción

Este proyecto implementa un chatbot inteligente que se entrena exclusivamente con documentos PDF que tú subes. El chatbot solo responderá con información contenida en los documentos y no utilizará conocimiento externo de internet.

## 🏗️ Arquitectura

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Base de datos**: MongoDB
- **IA**: OpenAI GPT-3.5/4
- **Procesamiento PDF**: pdf-parse

## 📋 Requisitos previos

1. **Node.js** (versión 16 o superior)
2. **MongoDB** (local o MongoDB Atlas)
3. **Cuenta de OpenAI** con API key

## 🚀 Instalación y configuración

### 1. Configurar el Backend

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env
```

### 2. Configurar variables de entorno

Edita el archivo `backend/.env` con tus credenciales:

```env
PORT=3001
OPENAI_API_KEY=tu_clave_de_openai_aqui
MONGODB_URI=mongodb://localhost:27017/bamconect360
NODE_ENV=development
MAX_FILE_SIZE=10MB
ALLOWED_FILE_TYPES=application/pdf
OPENAI_MODEL=gpt-3.5-turbo
MAX_TOKENS=1000
```

### 3. Obtener API Key de OpenAI

1. Ve a [OpenAI API](https://platform.openai.com/api-keys)
2. Crea una nueva API key
3. Cópiala en tu archivo `.env`

### 4. Configurar MongoDB

**Opción A: MongoDB Local**

```bash
# Instalar MongoDB localmente
# macOS con Homebrew:
brew install mongodb-community

# Iniciar MongoDB
brew services start mongodb-community
```

**Opción B: MongoDB Atlas (Cloud)**

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén la connection string
4. Úsala en `MONGODB_URI`

### 5. Iniciar el Backend

```bash
# En el directorio backend/
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

### 6. Configurar e iniciar el Frontend

```bash
# Desde la raíz del proyecto
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 📖 Uso

### 1. Administrar documentos

- Ve a `http://localhost:5173/admin-pdfs`
- Sube los archivos PDF que quieres usar para entrenar el chatbot
- Gestiona (elimina) documentos según necesites

### 2. Usar el chatbot

- Ve a `http://localhost:5173/chatbot`
- Haz preguntas relacionadas con el contenido de los PDFs subidos
- El chatbot solo responderá con información de los documentos

## 🔧 Funcionalidades

### Backend API

- `GET /api/health` - Estado del servidor
- `POST /api/upload-pdf` - Subir y procesar PDF
- `GET /api/pdfs` - Listar PDFs subidos
- `DELETE /api/pdfs/:id` - Eliminar PDF
- `POST /api/chat` - Enviar mensaje al chatbot
- `POST /api/reset-training` - Eliminar todos los PDFs

### Características del Chatbot

- **Entrenamiento exclusivo**: Solo usa información de PDFs subidos
- **Procesamiento inteligente**: Extrae y analiza texto de PDFs
- **Respuestas contextuales**: Mantiene el contexto de la conversación
- **Limitaciones controladas**: No inventa información externa

## 🛠️ Desarrollo

### Estructura del proyecto

```
proyecto/
├── backend/
│   ├── server.js          # Servidor principal
│   ├── package.json       # Dependencias del backend
│   ├── .env.example       # Variables de entorno ejemplo
│   └── uploads/           # Archivos PDF temporales
├── src/
│   ├── Components/
│   │   ├── Chatbot.jsx    # Componente del chatbot
│   │   ├── PDFManager.jsx # Administrador de PDFs
│   │   └── ...
│   └── App.jsx            # Rutas principales
└── package.json           # Dependencias del frontend
```

### Scripts disponibles

**Backend:**

- `npm start` - Iniciar en producción
- `npm run dev` - Iniciar con nodemon (desarrollo)

**Frontend:**

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build

## 🔒 Seguridad

- Rate limiting implementado (100 requests/15min)
- Validación de tipos de archivo
- Límites de tamaño de archivo (10MB)
- Sanitización de inputs
- Helmet.js para headers de seguridad

## 🐛 Troubleshooting

### Error: "Servidor desconectado"

- Verifica que MongoDB esté corriendo
- Verifica que el backend esté iniciado
- Revisa los logs del servidor

### Error: "Clave de API inválida"

- Verifica tu API key de OpenAI
- Asegúrate de tener créditos en tu cuenta OpenAI

### Error: "El PDF no contiene texto legible"

- Asegúrate de que el PDF no sea una imagen escaneada
- Usa PDFs con texto seleccionable

### Error de conexión CORS

- Verifica que el frontend esté en puerto 5173
- Revisa la configuración de CORS en el backend

## 📝 Notas importantes

1. **Costo de OpenAI**: Cada consulta consume tokens de tu cuenta OpenAI
2. **Límite de PDFs**: No hay límite técnico, pero más documentos = mayor costo
3. **Calidad de PDFs**: Los PDFs con mejor formato darán mejores resultados
4. **Tiempo de respuesta**: Depende del tamaño de los documentos y la API de OpenAI

## 🚀 Próximas mejoras

- [ ] Soporte para más tipos de archivo (Word, TXT)
- [ ] Interfaz para ver el contenido extraído de PDFs
- [ ] Sistema de usuarios y autenticación
- [ ] Métricas de uso del chatbot
- [ ] Integración con otras APIs de IA
- [ ] Modo offline con modelos locales

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs del servidor
2. Verifica la configuración de variables de entorno
3. Asegúrate de que todas las dependencias estén instaladas
4. Consulta la documentación de OpenAI y MongoDB
