import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { defineString } from "firebase-functions/params";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import multer from "multer";
import pdfParse from "pdf-parse";
import OpenAI from "openai";

// Definir parámetros
const openaiApiKey = defineString("OPENAI_API_KEY");

// Inicializar Firebase Admin
initializeApp();
const db = getFirestore();

// Configurar OpenAI
const openai = new OpenAI({
	apiKey: openaiApiKey.value(),
});

// Crear app Express
const app = express();

// Middleware de seguridad
app.use(helmet());
app.use(
	cors({
		origin: true, // Permitir todas las origins en production
		credentials: true,
	})
);

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 100,
	message: "Demasiadas solicitudes, intenta de nuevo más tarde.",
});
app.use(limiter);

// Middleware para parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Configuración de multer para Cloud Functions
const upload = multer({
	storage: multer.memoryStorage(),
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

// Variable para almacenar el contenido de entrenamiento en memoria
let trainingContent = "";

// Función para cargar el contenido de entrenamiento desde Firestore
async function loadTrainingContent() {
	try {
		const pdfsSnapshot = await db
			.collection("pdfContents")
			.where("isActive", "==", true)
			.get();

		const contents = [];
		pdfsSnapshot.forEach((doc) => {
			contents.push(doc.data().content);
		});

		trainingContent = contents.join("\\n\\n--- DOCUMENTO SEPARADO ---\\n\\n");
		console.log(
			`📚 Contenido de entrenamiento cargado: ${pdfsSnapshot.size} documentos`
		);
	} catch (error) {
		console.error("Error cargando contenido de entrenamiento:", error);
	}
}

// Cargar contenido al iniciar
loadTrainingContent();

// RUTAS

// Ruta de salud del servidor
app.get("/health", (req, res) => {
	res.json({
		status: "OK",
		message: "Servidor funcionando correctamente",
		documentsLoaded: trainingContent.length > 0 ? "Sí" : "No",
	});
});

// Ruta para subir PDFs
app.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: "No se ha subido ningún archivo" });
		}

		// Procesar el PDF desde el buffer
		const pdfData = await pdfParse(req.file.buffer);

		if (!pdfData.text || pdfData.text.trim().length === 0) {
			return res
				.status(400)
				.json({ error: "El PDF no contiene texto legible" });
		}

		// Guardar en Firestore
		const docRef = await db.collection("pdfContents").add({
			filename: req.file.originalname,
			content: pdfData.text,
			uploadDate: new Date(),
			isActive: true,
		});

		// Actualizar el contenido de entrenamiento
		await loadTrainingContent();

		res.json({
			message: "PDF procesado y almacenado correctamente",
			filename: req.file.originalname,
			contentLength: pdfData.text.length,
			id: docRef.id,
		});
	} catch (error) {
		console.error("Error procesando PDF:", error);
		res.status(500).json({
			error: "Error procesando el PDF",
			details: error.message,
		});
	}
});

// Ruta para obtener la lista de PDFs subidos
app.get("/pdfs", async (req, res) => {
	try {
		const pdfsSnapshot = await db
			.collection("pdfContents")
			.where("isActive", "==", true)
			.orderBy("uploadDate", "desc")
			.get();

		const pdfs = [];
		pdfsSnapshot.forEach((doc) => {
			const data = doc.data();
			pdfs.push({
				_id: doc.id,
				filename: data.filename,
				uploadDate: data.uploadDate.toDate(),
			});
		});

		res.json(pdfs);
	} catch (error) {
		console.error("Error obteniendo PDFs:", error);
		res.status(500).json({ error: "Error obteniendo la lista de PDFs" });
	}
});

// Ruta para eliminar un PDF
app.delete("/pdfs/:id", async (req, res) => {
	try {
		await db.collection("pdfContents").doc(req.params.id).update({
			isActive: false,
		});
		await loadTrainingContent();
		res.json({ message: "PDF eliminado correctamente" });
	} catch (error) {
		console.error("Error eliminando PDF:", error);
		res.status(500).json({ error: "Error eliminando el PDF" });
	}
});

// Ruta principal del chatbot
app.post("/chat", async (req, res) => {
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
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content: systemPrompt,
				},
			],
			max_tokens: 1000,
			temperature: 0.3,
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
				details: error.message,
			});
		}
	}
});

// Ruta para resetear el entrenamiento
app.post("/reset-training", async (req, res) => {
	try {
		const batch = db.batch();
		const pdfsSnapshot = await db.collection("pdfContents").get();

		pdfsSnapshot.forEach((doc) => {
			batch.update(doc.ref, { isActive: false });
		});

		await batch.commit();
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

// Exportar como Firebase Function
export const api = onRequest(
	{
		cors: true,
		region: "us-central1",
		memory: "1GiB",
		timeoutSeconds: 300,
	},
	app
);
