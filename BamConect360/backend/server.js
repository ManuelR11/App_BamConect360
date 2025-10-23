import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import pdfParse from "pdf-parse";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Configuración para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT) || 3001;

// Configurar OpenAI
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// Middleware de seguridad
app.use(helmet());
app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"http://localhost:3000",
			"https://bamconecta360.web.app",
			"https://bamconecta360.firebaseapp.com",
		], // URLs del frontend incluyendo Firebase
		credentials: true,
	})
);

// Middleware de logging
app.use((req, res, next) => {
	console.log(`📥 ${req.method} ${req.path} - ${new Date().toISOString()}`);
	next();
});

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 100, // máximo 100 requests por ventana por IP
	message: "Demasiadas solicitudes, intenta de nuevo más tarde.",
});
app.use(limiter);

// Middleware para parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Crear directorio para uploads si no existe
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadsDir);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, `pdf-${uniqueSuffix}.pdf`);
	},
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 10 * 1024 * 1024, // 10MB máximo
	},
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "application/pdf") {
			cb(null, true);
		} else {
			cb(new Error("Solo se permiten archivos PDF"), false);
		}
	},
});

// Esquema de MongoDB para almacenar el contenido de los PDFs
const pdfContentSchema = new mongoose.Schema({
	filename: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	uploadDate: {
		type: Date,
		default: Date.now,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
});

const PDFContent = mongoose.model("PDFContent", pdfContentSchema);

// Conectar a MongoDB
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/bamconect360";
console.log("🔗 Intentando conectar a MongoDB:", mongoUri.replace(/\/\/.*@/, "//***@")); // Ocultar credenciales en logs

mongoose
	.connect(mongoUri)
	.then(() => {
		console.log("✅ Conectado a MongoDB exitosamente");
		loadTrainingContent(); // Cargar contenido después de conectar
	})
	.catch((err) => {
		console.error("❌ Error conectando a MongoDB:", err.message);
		console.error("📋 URI (sin credenciales):", mongoUri.replace(/\/\/.*@/, "//***@"));
	});

// Manejar eventos de conexión de MongoDB
mongoose.connection.on('connected', () => {
	console.log('🔗 Mongoose conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
	console.error('❌ Error de conexión MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
	console.log('🔌 Mongoose desconectado de MongoDB');
});

// Variable para almacenar el contenido de entrenamiento en memoria
let trainingContent = "";

// Función para cargar el contenido de entrenamiento desde la base de datos
async function loadTrainingContent() {
	try {
		const pdfs = await PDFContent.find({ isActive: true });
		trainingContent = pdfs
			.map((pdf) => pdf.content)
			.join("\n\n--- DOCUMENTO SEPARADO ---\n\n");
		console.log(
			`📚 Contenido de entrenamiento cargado: ${pdfs.length} documentos`
		);
	} catch (error) {
		console.error("Error cargando contenido de entrenamiento:", error);
	}
}

// RUTAS

// Ruta básica de verificación (no depende de MongoDB)
app.get("/", (req, res) => {
	try {
		res.status(200).json({
			status: "OK",
			message: "BamConect360 API está funcionando",
			timestamp: new Date().toISOString(),
			environment: process.env.NODE_ENV || "development",
			port: PORT
		});
	} catch (error) {
		console.error("Error en ruta principal:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
});

// Ruta de salud del servidor
app.get("/api/health", (req, res) => {
	try {
		res.status(200).json({
			status: "OK",
			message: "Servidor funcionando correctamente",
			documentsLoaded: trainingContent.length > 0 ? "Sí" : "No",
			mongodb: mongoose.connection.readyState === 1 ? "Conectado" : "Desconectado",
			timestamp: new Date().toISOString()
		});
	} catch (error) {
		console.error("Error en health check:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
});

// Ruta para subir PDFs
app.post("/api/upload-pdf", upload.single("pdf"), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: "No se ha subido ningún archivo" });
		}

		// Leer y procesar el PDF
		const pdfBuffer = fs.readFileSync(req.file.path);
		const pdfData = await pdfParse(pdfBuffer);

		if (!pdfData.text || pdfData.text.trim().length === 0) {
			return res
				.status(400)
				.json({ error: "El PDF no contiene texto legible" });
		}

		// Guardar en la base de datos
		const pdfContent = new PDFContent({
			filename: req.file.originalname,
			content: pdfData.text,
		});

		await pdfContent.save();

		// Actualizar el contenido de entrenamiento
		await loadTrainingContent();

		// Eliminar el archivo temporal
		fs.unlinkSync(req.file.path);

		res.json({
			message: "PDF procesado y almacenado correctamente",
			filename: req.file.originalname,
			contentLength: pdfData.text.length,
		});
	} catch (error) {
		console.error("Error procesando PDF:", error);

		// Limpiar archivo si existe
		if (req.file && fs.existsSync(req.file.path)) {
			fs.unlinkSync(req.file.path);
		}

		res.status(500).json({
			error: "Error procesando el PDF",
			details: error.message,
		});
	}
});

// Ruta para obtener la lista de PDFs subidos
app.get("/api/pdfs", async (req, res) => {
	try {
		const pdfs = await PDFContent.find({ isActive: true })
			.select("filename uploadDate")
			.sort({ uploadDate: -1 });

		res.json(pdfs);
	} catch (error) {
		console.error("Error obteniendo PDFs:", error);
		res.status(500).json({ error: "Error obteniendo la lista de PDFs" });
	}
});

// Ruta para eliminar un PDF
app.delete("/api/pdfs/:id", async (req, res) => {
	try {
		await PDFContent.findByIdAndUpdate(req.params.id, { isActive: false });
		await loadTrainingContent();
		res.json({ message: "PDF eliminado correctamente" });
	} catch (error) {
		console.error("Error eliminando PDF:", error);
		res.status(500).json({ error: "Error eliminando el PDF" });
	}
});

// Ruta principal del chatbot
app.post("/api/chat", async (req, res) => {
	try {
		const { message } = req.body;

		if (!message || message.trim().length === 0) {
			return res.status(400).json({ error: "El mensaje no puede estar vacío" });
		}

		if (trainingContent.length === 0) {
			return res.json({
				response:
					"Lo siento, aún no tengo documentos para consultar. Por favor, sube algunos PDFs primero para que pueda ayudarte.",
			});
		}

		// Crear el prompt para OpenAI
		const systemPrompt = `Eres un asistente especializado de Bam Conecta 360. Tu única función es responder preguntas basándote EXCLUSIVAMENTE en el contenido de los documentos que te proporciono a continuación.

INSTRUCCIONES IMPORTANTES:
- Solo responde con información que esté contenida en los documentos proporcionados
- Si la pregunta no puede ser respondida con la información disponible, indica claramente que no tienes esa información en los documentos
- No inventes información ni uses conocimiento externo
- Mantén un tono profesional y útil
- Si encuentras información relevante, cítala de manera clara

CONTENIDO DE LOS DOCUMENTOS:
${trainingContent}

PREGUNTA DEL USUARIO: ${message}`;

		const completion = await openai.chat.completions.create({
			model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content: systemPrompt,
				},
			],
			max_tokens: parseInt(process.env.MAX_TOKENS) || 1000,
			temperature: 0.3, // Respuestas más consistentes y menos creativas
		});

		const response = completion.choices[0].message.content;

		res.json({ response });
	} catch (error) {
		console.error("Error en chat:", error);

		if (error.code === "insufficient_quota") {
			res.status(503).json({
				error: "Cuota de OpenAI agotada. Por favor, verifica tu suscripción.",
			});
		} else if (error.code === "invalid_api_key") {
			res.status(401).json({
				error: "Clave de API de OpenAI inválida.",
			});
		} else {
			res.status(500).json({
				error: "Error interno del servidor",
				details:
					process.env.NODE_ENV === "development" ? error.message : undefined,
			});
		}
	}
});

// Ruta para resetear el entrenamiento (eliminar todos los PDFs)
app.post("/api/reset-training", async (req, res) => {
	try {
		await PDFContent.updateMany({}, { isActive: false });
		trainingContent = "";
		res.json({ message: "Entrenamiento reseteado correctamente" });
	} catch (error) {
		console.error("Error reseteando entrenamiento:", error);
		res.status(500).json({ error: "Error reseteando el entrenamiento" });
	}
});

// Middleware de manejo de errores
app.use((error, req, res, next) => {
	if (error instanceof multer.MulterError) {
		if (error.code === "LIMIT_FILE_SIZE") {
			return res
				.status(400)
				.json({ error: "El archivo es demasiado grande. Máximo 10MB." });
		}
	}

	console.error("Error no manejado:", error);
	res.status(500).json({ error: "Error interno del servidor" });
});

// Ruta 404
app.use("*", (req, res) => {
	res.status(404).json({ error: "Ruta no encontrada" });
});

// Iniciar servidor
const server = app.listen(PORT, '0.0.0.0', () => {
	console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
	console.log(`📡 API disponible en http://localhost:${PORT}/api`);
	console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Manejo de errores del servidor
server.on('error', (error) => {
	if (error.code === 'EADDRINUSE') {
		console.error(`❌ Puerto ${PORT} ya está en uso`);
	} else {
		console.error('❌ Error del servidor:', error);
	}
});

// Manejo graceful shutdown
process.on('SIGTERM', () => {
	console.log('🛑 Cerrando servidor...');
	server.close(() => {
		console.log('✅ Servidor cerrado correctamente');
		process.exit(0);
	});
});
