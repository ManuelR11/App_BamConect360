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

// Detectar ambiente automáticamente
const isProduction =
	process.env.NODE_ENV === "production" ||
	process.env.PORT ||
	process.env.RAILWAY_ENVIRONMENT;
console.log(`🌍 Environment: ${isProduction ? "production" : "development"}`);

const app = express();
const PORT = parseInt(process.env.PORT) || 3001;

// Configurar trust proxy para Railway
app.set("trust proxy", 1);

// Configurar OpenAI solo si hay API key
let openai = null;
if (process.env.OPENAI_API_KEY) {
	openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	});
	console.log("✅ OpenAI configurado correctamente");
} else {
	console.log("⚠️ OpenAI API Key no encontrada - modo desarrollo");
}

// Middleware específico para PDFs antes de helmet
app.use((req, res, next) => {
	// Si la ruta es para PDF, aplicar headers específicos
	if (req.path.includes("/pdf") || req.path.includes(".pdf")) {
		res.setHeader("X-Frame-Options", "SAMEORIGIN");
		res.setHeader("X-Content-Type-Options", "nosniff");
		res.setHeader(
			"Content-Security-Policy",
			"frame-src 'self' data: blob:; object-src 'self' data: blob:;"
		);
	}
	next();
});

// Middleware de seguridad
app.use(
	helmet({
		contentSecurityPolicy: isProduction
			? false
			: {
					directives: {
						"default-src": ["'self'"],
						"frame-src": ["'self'", "data:", "blob:", "'unsafe-inline'"],
						"object-src": ["'self'", "data:", "blob:"],
						"script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
						"style-src": ["'self'", "'unsafe-inline'"],
						"img-src": ["'self'", "data:", "blob:", "https:"],
						"media-src": ["'self'", "data:", "blob:"],
						"connect-src": ["'self'", "data:", "blob:", "https:"],
						"font-src": ["'self'", "data:", "https:"],
						"worker-src": ["'self'", "blob:"],
						"child-src": ["'self'", "data:", "blob:"],
						"frame-ancestors": [
							"'self'",
							"http://localhost:5173",
							"http://localhost:5174",
							"http://localhost:3000",
							process.env.FRONTEND_URL || "'self'",
						],
					},
			  },
		crossOriginEmbedderPolicy: false,
		crossOriginResourcePolicy: { policy: "cross-origin" },
	})
);
app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"http://localhost:5174",
			"http://localhost:3000",
			"https://appbamconect360-production.up.railway.app",
			process.env.FRONTEND_URL || "*",
		],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	})
);

// Middleware de logging
app.use((req, res, next) => {
	console.log(`📥 ${req.method} ${req.path} - ${new Date().toISOString()}`);
	next();
});

// Middleware específico para debuggear rutas API
app.use("/api/*", (req, res, next) => {
	console.log(`🔍 API Route Hit: ${req.method} ${req.path}`);
	next();
});

// Middleware específico para rutas de PDF que necesitan headers especiales
app.use("/api/pdf*", (req, res, next) => {
	// Headers específicos para PDFs y contenido embebido
	res.setHeader("X-Content-Type-Options", "nosniff");
	res.setHeader("X-Frame-Options", "SAMEORIGIN");
	res.setHeader("Content-Security-Policy", "frame-src 'self' data: blob:");
	next();
});

// Rate limiting - configuración permisiva para PWA
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 1000, // máximo 1000 requests por ventana por IP (aumentado para PWA)
	message: "Demasiadas solicitudes, intenta de nuevo más tarde.",
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// Excluir archivos estáticos del rate limiting
	skip: (req, res) => {
		// No aplicar rate limiting a archivos estáticos comunes
		const staticFiles = [
			"/sw.js",
			"/workbox-",
			"/assets/",
			"/icons/",
			"/favicon",
			"/manifest.json",
			"/apple-touch-icon",
		];
		return staticFiles.some((path) => req.path.includes(path));
	},
});
app.use(limiter);

// Rate limiting específico para APIs críticas (más estricto)
const apiLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minuto
	max: 60, // máximo 60 requests por minuto para APIs
	message: "Demasiadas solicitudes a la API, intenta de nuevo más tarde.",
	standardHeaders: true,
	legacyHeaders: false,
});

// Aplicar rate limiting específico solo a rutas de API sensibles
app.use("/api/upload", apiLimiter);
app.use("/api/chat", apiLimiter);

// Middleware para parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

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
	// Nuevo campo para almacenar el PDF binario original con formato completo
	pdfBinary: {
		type: Buffer,
		required: false, // Opcional para mantener compatibilidad con documentos existentes
	},
	filePath: {
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
	ratings: [
		{
			rating: {
				type: Number,
				min: 1,
				max: 5,
				required: true,
			},
			timestamp: {
				type: Date,
				default: Date.now,
			},
			// En una implementación real, podrías agregar userIP o userId
			userIP: String,
		},
	],
	averageRating: {
		type: Number,
		default: 0,
	},
	totalRatings: {
		type: Number,
		default: 0,
	},
});

const PDFContent = mongoose.model("PDFContent", pdfContentSchema);

// Funciones para servir PDFs
const isValidPdfId = (id) => id && id !== "undefined" && id.length === 24;

const servePdfDocument = async (req, res) => {
	const { id } = req.params;
	console.log(`🔥 [PDF ROUTE HIT] ID: ${id}`);

	try {
		if (!isValidPdfId(id)) {
			console.log(`❌ [PDF ROUTE] ID inválido: ${id}`);
			return res.status(400).json({ error: "ID de PDF inválido" });
		}

		const pdf = await PDFContent.findById(id);
		if (!pdf || !pdf.isActive) {
			console.log(`❌ [PDF ROUTE] PDF no encontrado: ${id}`);
			return res.status(404).json({ error: "PDF no encontrado" });
		}

		console.log(`🔍 [PDF ROUTE] Verificando archivo en: ${pdf.filePath}`);
		console.log(
			`🔍 [PDF ROUTE] Archivo existe: ${fs.existsSync(pdf.filePath)}`
		);

		if (!pdf.filePath || !fs.existsSync(pdf.filePath)) {
			console.log(`❌ [PDF ROUTE] Archivo no existe: ${pdf.filePath}`);
			console.log(`📁 [PDF ROUTE] Contenido del directorio uploads:`);
			try {
				const uploadsDir = path.join(__dirname, "uploads");
				console.log(`📁 [PDF ROUTE] Directorio uploads: ${uploadsDir}`);
				console.log(
					`📁 [PDF ROUTE] Existe directorio: ${fs.existsSync(uploadsDir)}`
				);
				if (fs.existsSync(uploadsDir)) {
					const files = fs.readdirSync(uploadsDir);
					console.log(
						`📁 [PDF ROUTE] Archivos en uploads: ${files.length} archivos`
					);
					files.forEach((file) => console.log(`  - ${file}`));
				}
			} catch (dirError) {
				console.log(
					`❌ [PDF ROUTE] Error leyendo directorio: ${dirError.message}`
				);
			}
			return res
				.status(404)
				.json({ error: "Archivo PDF no encontrado en el servidor" });
		}

		res.setHeader("Content-Type", "application/pdf");
		res.setHeader("Content-Disposition", `inline; filename="${pdf.filename}"`);
		res.setHeader("X-Frame-Options", "SAMEORIGIN");
		res.setHeader("Cache-Control", "public, max-age=3600");
		res.setHeader("Access-Control-Allow-Origin", "*");

		console.log(
			`✅ [PDF ROUTE] Sirviendo PDF: ${pdf.filename} desde ${pdf.filePath}`
		);
		res.sendFile(path.resolve(pdf.filePath));
	} catch (error) {
		console.error("❌ [PDF ROUTE] Error sirviendo documento:", error);
		res.status(500).json({ error: "Error obteniendo el PDF" });
	}
};

// Función para crear PDF profesional desde contenido de BD
const createSimplePDFBase64 = async (filename, content) => {
	try {
		const PDFDocument = await import("pdfkit").then((m) => m.default);

		return new Promise((resolve, reject) => {
			const doc = new PDFDocument({ 
				margin: 60,
				size: 'A4',
				bufferPages: true 
			});
			const chunks = [];

			doc.on("data", (chunk) => chunks.push(chunk));
			doc.on("end", () => {
				const pdfBuffer = Buffer.concat(chunks);
				const base64 = pdfBuffer.toString("base64");
				resolve(base64);
			});
			doc.on("error", reject);

			// Colores corporativos
			const primaryColor = '#1e3a8a'; // Azul corporativo
			const secondaryColor = '#3b82f6'; // Azul claro
			const textColor = '#374151'; // Gris oscuro
			const accentColor = '#f59e0b'; // Amarillo/dorado

			// Header con logo BAM (simulado)
			doc.rect(0, 0, doc.page.width, 80).fill(primaryColor);
			
			// Logo y título del header
			doc.fontSize(24)
			   .fillColor('white')
			   .text('BAM', 60, 25, { width: 100 });
			
			doc.fontSize(14)
			   .fillColor('white')
			   .text('Banco de América Móvil', 150, 35);

			// Título principal del documento
			doc.fontSize(22)
			   .fillColor(primaryColor)
			   .font('Helvetica-Bold')
			   .text(filename.replace('.pdf', ''), 60, 120, {
				   width: doc.page.width - 120,
				   align: 'center'
			   });

			// Línea decorativa
			doc.rect(60, 160, doc.page.width - 120, 3).fill(secondaryColor);

			// Preparar contenido
			const cleanContent = content || "Contenido no disponible";
			const paragraphs = cleanContent.split('\n\n').filter(p => p.trim().length > 0);
			
			let currentY = 200;
			const pageHeight = doc.page.height - 120; // Espacio para footer
			const lineHeight = 18;

			paragraphs.forEach((paragraph, index) => {
				const trimmedParagraph = paragraph.trim();
				
				// Verificar si necesitamos nueva página
				if (currentY > pageHeight) {
					doc.addPage();
					currentY = 60;
				}

				// Detectar títulos/subtítulos (líneas cortas o que empiecen con números/letras)
				const isTitle = trimmedParagraph.length < 80 && 
					(trimmedParagraph.match(/^[0-9]+\./) || 
					 trimmedParagraph.match(/^[A-Z][A-Z\s]+:/) ||
					 trimmedParagraph.split(' ').length <= 8);

				if (isTitle) {
					// Estilo para títulos
					doc.fontSize(16)
					   .fillColor(primaryColor)
					   .font('Helvetica-Bold')
					   .text(trimmedParagraph, 60, currentY, {
						   width: doc.page.width - 120,
						   align: 'left'
					   });
					currentY += 25;
				} else {
					// Estilo for párrafos normales
					doc.fontSize(11)
					   .fillColor(textColor)
					   .font('Helvetica')
					   .text(trimmedParagraph, 60, currentY, {
						   width: doc.page.width - 120,
						   align: 'justify',
						   lineGap: 3
					   });
					
					// Calcular altura del texto
					const textHeight = doc.heightOfString(trimmedParagraph, {
						width: doc.page.width - 120
					});
					currentY += textHeight + 15;
				}
			});

			// Footer en todas las páginas
			const addFooter = (pageNum, totalPages) => {
				const footerY = doc.page.height - 50;
				
				// Línea footer
				doc.rect(60, footerY - 10, doc.page.width - 120, 1).fill(secondaryColor);
				
				// Texto footer
				doc.fontSize(9)
				   .fillColor('#6b7280')
				   .font('Helvetica')
				   .text('BAM - Banco de América Móvil', 60, footerY, { align: 'left' })
				   .text(`Página ${pageNum} de ${totalPages}`, 0, footerY, { 
					   width: doc.page.width - 60, 
					   align: 'right' 
				   });
				   
				// Fecha de generación
				doc.text(`Generado: ${new Date().toLocaleDateString('es-ES')}`, 60, footerY + 12, { 
					align: 'left',
					fontSize: 8 
				});
			};

			// Agregar footers a todas las páginas
			const totalPages = doc.bufferedPageRange().count;
			for (let i = 0; i < totalPages; i++) {
				doc.switchToPage(i);
				addFooter(i + 1, totalPages);
			}

			doc.end();
		});
	} catch (error) {
		console.log(`⚠️ [PDF Generator] Error generando PDF: ${error.message}`);

		// Fallback: crear un base64 básico con información mínima
		const basicContent = `data:application/pdf;base64,${Buffer.from(
			`PDF: ${filename}\n\n${content || "Sin contenido"}`
		).toString("base64")}`;
		return basicContent.split(",")[1];
	}
};

// Función auxiliar para generar contenido personalizado
const generateCustomPDFContent = (filename, content) => {
	// Extraer información del filename para personalizar
	const titleMap = {
		"Solicitud de Tarjeta.pdf": {
			title: "SOLICITUD DE TARJETA",
			subtitle: "Guía y procedimiento bancario",
			description:
				"Proceso completo para solicitar tarjetas de crédito y débito",
		},
		"Solicitud de Prestamos.pdf": {
			title: "SOLICITUD DE PRÉSTAMOS",
			subtitle: "Guía y procedimiento bancario",
			description:
				"Información detallada para solicitudes de préstamos personales",
		},
		"Pago de Servicios.pdf": {
			title: "PAGO DE SERVICIOS",
			subtitle: "Guía y procedimiento bancario",
			description: "Instrucciones para realizar pagos de servicios públicos",
		},
		"Gestión de Chequeras.pdf": {
			title: "GESTIÓN DE CHEQUERAS",
			subtitle: "Guía y procedimiento bancario",
			description: "Proceso para solicitar y gestionar chequeras",
		},
		"Manual de apertura de cuenta ejemplo.pdf": {
			title: "APERTURA DE CUENTA",
			subtitle: "Guía y procedimiento bancario",
			description: "Manual completo para abrir cuentas bancarias",
		},
	};

	const customInfo = titleMap[filename] || {
		title: filename.replace(".pdf", "").toUpperCase(),
		subtitle: "Guía y procedimiento bancario",
		description: "Información bancaria especializada",
	};

	console.log(`🎨 [CUSTOM PDF] Generando para: ${customInfo.title}`);
	return customInfo;
};

// Nueva función para servir PDF como Base64 (mejorada para buscar por nombre)
const servePdfAsBase64 = async (req, res) => {
	const { id } = req.params;
	console.log(`📄 [PDF BASE64 ROUTE] ID: ${id}`);

	try {
		if (!isValidPdfId(id)) {
			console.log(`❌ [PDF BASE64] ID inválido: ${id}`);
			return res.status(400).json({ error: "ID de PDF inválido" });
		}

		const pdf = await PDFContent.findById(id);
		if (!pdf || !pdf.isActive) {
			console.log(`❌ [PDF BASE64] PDF no encontrado o inactivo: ${id}`);
			return res.status(404).json({ error: "PDF no encontrado" });
		}

		console.log(`✅ [PDF BASE64] PDF encontrado: ${pdf.filename}`);

		// Usar el filePath de la base de datos, pero ajustar para desarrollo/producción
		let targetFilePath = pdf.filePath;

		console.log(`📂 [PDF BASE64] FilePath original de BD: ${targetFilePath}`);

		// Si estamos en desarrollo local, ajustar la ruta
		if (!isProduction && targetFilePath.includes("/app/backend/uploads/")) {
			// Convertir ruta de producción a ruta de desarrollo local
			const filename = path.basename(targetFilePath);
			targetFilePath = path.join(__dirname, "uploads", filename);
			console.log(
				`🔄 [PDF BASE64] Ajustado para desarrollo local: ${targetFilePath}`
			);
		} else if (
			isProduction &&
			!targetFilePath.includes("/app/backend/uploads/")
		) {
			// Convertir ruta de desarrollo a ruta de producción
			const filename = path.basename(targetFilePath);
			targetFilePath = `/app/backend/uploads/${filename}`;
			console.log(
				`🔄 [PDF BASE64] Ajustado para producción: ${targetFilePath}`
			);
		}

		console.log(`📂 [PDF BASE64] Usando filePath final: ${targetFilePath}`);

		// Verificar que el archivo existe
		if (!targetFilePath || !fs.existsSync(targetFilePath)) {
			console.log(`❌ [PDF BASE64] Archivo no existe: ${targetFilePath}`);

			// MAPEO INTELIGENTE: Buscar archivo que coincida con el nombre del PDF
			const uploadsDir = path.join(__dirname, "uploads");
			console.log(` [PDF BASE64] Directorio uploads: ${uploadsDir}`);

			try {
				const availableFiles = fs
					.readdirSync(uploadsDir)
					.filter((f) => f.endsWith(".pdf"));
				console.log(
					`📋 [PDF BASE64] Archivos disponibles: ${availableFiles
						.slice(0, 5)
						.join(", ")}${availableFiles.length > 5 ? "..." : ""}`
				);

				if (availableFiles.length > 0) {
					console.log(
						`🔍 [PDF BASE64] Mapeo DIRECTO para: "${pdf.filename}" (ID: ${pdf._id})`
					);

					// MAPEO DIRECTO CON IDs CORREGIDOS (PDFs recién subidos)
					const directMapping = {
						// IDs exactos de la base de datos -> archivos físicos
						"6913edf86a34e53a641e800d": "pdf-1762839882812-24906428.pdf", // Gestion de Chequeras.pdf
						"6913ee376a34e53a641e8011": "pdf-1762839955729-521323488.pdf", // Consulta de Saldos y Movimientos.pdf
						"6913ee656a34e53a641e8015": "pdf-1762839898137-325926996.pdf", // Manual de apertura de cuenta ejemplo.pdf
						"6913ee896a34e53a641e8019": "pdf-1762839922766-525834752.pdf", // Manual de inversion a plazo fijo.pdf (ID CORREGIDO)
						"6913eeef6a34e53a641e801d": "pdf-1762839910147-424431997.pdf", // Pago de Servicios.pdf
						"6913ef9a6a34e53a641e8021": "pdf-1762839927397-384975741.pdf", // Seguimiento de Prestamos.pdf
						"6913efda6a34e53a641e8025": "pdf-1762839917088-443931258.pdf", // Solicitud de Prestamos.pdf
						"6913f0396a34e53a641e8029": "pdf-1762839890353-607425718.pdf", // Solicitud de Tarjeta.pdf
					};

					let matchingFile = null;
					const currentId = pdf._id.toString();

					// BUSCAR DIRECTAMENTE POR ID
					if (
						directMapping[currentId] &&
						availableFiles.includes(directMapping[currentId])
					) {
						matchingFile = directMapping[currentId];
						console.log(
							`🎯 [PDF BASE64] Mapeo DIRECTO encontrado: ${currentId} (${pdf.filename}) -> ${matchingFile}`
						);
					} else {
						console.log(
							`❌ [PDF BASE64] ID no encontrado en mapeo directo: ${currentId} (${pdf.filename})`
						);
						console.log(
							`📋 [PDF BASE64] IDs disponibles en mapeo:`,
							Object.keys(directMapping)
						);

						// Fallback simple: usar primer archivo
						matchingFile = availableFiles[0];
						console.log(
							`� [PDF BASE64] FALLBACK - usando primer archivo: ${matchingFile}`
						);
						console.log(
							`⚠️ [PDF BASE64] AGREGAR AL MAPEO: "${currentId}": "archivo-correcto.pdf", // ${pdf.filename}`
						);
					}

					// Asignar el archivo mapeado
					targetFilePath = path.join(uploadsDir, matchingFile);
					console.log(
						`✅ [PDF BASE64] Archivo final asignado: ${matchingFile}`
					);
				} else {
					return res.status(404).json({
						error: "No hay archivos PDF disponibles en el sistema",
						filename: pdf.filename,
						originalPath: pdf.filePath,
						uploadsDir: uploadsDir,
					});
				}
			} catch (e) {
				return res.status(404).json({
					error: "Error accediendo al directorio de archivos",
					filename: pdf.filename,
					originalPath: pdf.filePath,
					errorMessage: e.message,
				});
			}
		}

		let base64Data;
		let fileSize;
		let sourceType;

		// PRIORIDAD 1: Usar PDF binario original si está disponible (mantiene formato completo)
		if (pdf.pdfBinary && pdf.pdfBinary.length > 0) {
			console.log(`🎯 [PDF BASE64] USANDO PDF BINARIO ORIGINAL con formato completo: ${pdf.filename}`);
			base64Data = pdf.pdfBinary.toString('base64');
			fileSize = pdf.pdfBinary.length;
			sourceType = 'PDF_BINARIO_ORIGINAL';
			console.log(`✅ [PDF BASE64] PDF binario original usado: ${fileSize} bytes`);
		} 
		// PRIORIDAD 2: Generar desde texto si no hay PDF binario
		else {
			console.log(`🎯 [PDF BASE64] PDF binario no disponible, generando desde texto: ${pdf.filename}`);
			base64Data = await createSimplePDFBase64(pdf.filename, pdf.content);
			fileSize = Buffer.from(base64Data, 'base64').length;
			sourceType = 'GENERADO_DESDE_TEXTO';
			console.log(`✅ [PDF BASE64] PDF generado desde texto: ${fileSize} bytes`);
		}

		console.log(
			`📄 [PDF BASE64] PDF convertido a Base64: ${pdf.filename} (${fileSize} bytes)`
		);

		// Configurar headers específicos para PDFs
		res.setHeader("Content-Type", "application/json");
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization"
		);
		res.setHeader("X-Content-Type-Options", "nosniff");
		res.setHeader("X-Frame-Options", "SAMEORIGIN");

		res.json({
			filename: pdf.filename,
			base64: base64Data,
			contentType: "application/pdf",
			pdfId: pdf._id,
			sourceType: sourceType,
			hasPdfBinary: !!(pdf.pdfBinary && pdf.pdfBinary.length > 0),
			contentLength: pdf.content ? pdf.content.length : 0,
			fileSize: fileSize
		});
	} catch (error) {
		console.error("❌ [PDF BASE64] Error:", error);
		res.status(500).json({ error: "Error obteniendo el PDF" });
	}
};



// ⚠️ RUTAS CRÍTICAS DE PDF - DEBEN ESTAR ANTES DE LOS ARCHIVOS ESTÁTICOS
app.get("/documents/test", (req, res) => {
	console.log("🧪 [PDF ROUTE] Test de documentos funcionando");
	res.json({ message: "Ruta de documentos funcionando correctamente" });
});

app.get("/documents/:id", servePdfDocument);
app.get("/files/:id", (req, res) => {
	console.log(`🚀 [FILES ROUTE] Ruta /files/${req.params.id} alcanzada!`);
	servePdfDocument(req, res);
});
app.get("/api/pdf/:id", (req, res) => {
	console.log(`🚀 [API PDF ROUTE] Ruta /api/pdf/${req.params.id} alcanzada!`);
	servePdfDocument(req, res);
});
app.get("/api/pdf/:id/base64", servePdfAsBase64);

// Ruta de diagnóstico para CSP
app.get("/api/debug/csp-test", (req, res) => {
	res.setHeader("Content-Security-Policy", "frame-src 'self' data: blob:");
	res.json({
		environment: isProduction ? "production" : "development",
		cspDisabled: isProduction,
		message: "CSP Test - iframe con data: URLs debería funcionar",
		headers: {
			"Content-Security-Policy": "frame-src 'self' data: blob:",
			"X-Frame-Options": "SAMEORIGIN",
		},
	});
});

// Ruta de debug para verificar contenido real de archivos físicos
app.get("/api/debug/pdf-content", async (req, res) => {
	try {
		console.log("🔍 [DEBUG] Analizando contenido real de archivos físicos...");

		const uploadsDir = path.join(__dirname, "uploads");
		const physicalFiles = fs
			.readdirSync(uploadsDir)
			.filter((file) => file.endsWith(".pdf"))
			.slice(0, 10); // Limitar a los primeros 10 archivos

		const fileAnalysis = [];

		for (const file of physicalFiles) {
			try {
				const filePath = path.join(uploadsDir, file);
				const pdfBuffer = fs.readFileSync(filePath);
				const parsedPdf = await pdfParse(pdfBuffer);
				const content = parsedPdf.text;

				// Extraer las primeras líneas para identificar el contenido
				const lines = content
					.split("\n")
					.filter((line) => line.trim())
					.slice(0, 10);
				const title =
					lines.find(
						(line) =>
							line.includes("APERTURA") ||
							line.includes("TARJETA") ||
							line.includes("PRESTAMO") ||
							line.includes("SERVICIO") ||
							line.includes("CHEQUERA") ||
							line.includes("SEGUIMIENTO") ||
							line.includes("PAGO")
					) ||
					lines[0] ||
					"";

				fileAnalysis.push({
					filename: file,
					detectedTitle: title.trim(),
					contentPreview: lines.slice(0, 5).join(" | "),
					size: pdfBuffer.length,
					probableType: title.includes("APERTURA")
						? "Apertura de cuenta"
						: title.includes("TARJETA")
						? "Solicitud de tarjeta"
						: title.includes("PRESTAMO") || title.includes("SEGUIMIENTO")
						? "Préstamos/Seguimiento"
						: title.includes("SERVICIO") || title.includes("PAGO")
						? "Pago de servicios"
						: title.includes("CHEQUERA") || title.includes("GESTIÓN")
						? "Gestión de chequeras"
						: "Desconocido",
				});
			} catch (parseError) {
				fileAnalysis.push({
					filename: file,
					detectedTitle: "ERROR",
					contentPreview: `Error parseando: ${parseError.message}`,
					size: 0,
					probableType: "Error",
				});
			}
		}

		// Obtener PDFs de BD para comparar
		const dbPdfs = await PDFContent.find({ isActive: true })
			.select("_id filename content")
			.sort({ uploadDate: -1 });

		res.json({
			message: "Análisis de contenido real de archivos físicos",
			physicalFilesAnalysis: fileAnalysis,
			databasePdfs: dbPdfs.map((pdf) => ({
				id: pdf._id,
				filename: pdf.filename,
				contentPreview: pdf.content.substring(0, 200),
			})),
			recommendations:
				"Comparar el contenido real con el mapeo actual para corregir asignaciones",
		});
	} catch (error) {
		console.error("❌ [DEBUG] Error analizando contenido:", error);
		res.status(500).json({
			error: "Error analizando contenido de archivos",
			details: error.message,
		});
	}
});

// Ruta de debug para mostrar IDs descriptivos
app.get("/api/debug/pdf-ids", async (req, res) => {
	try {
		const generateDescriptiveId = (filename) => {
			return filename
				.toLowerCase()
				.replace(/\s+/g, "-")
				.replace(/[áàäâ]/g, "a")
				.replace(/[éèëê]/g, "e")
				.replace(/[íìïî]/g, "i")
				.replace(/[óòöô]/g, "o")
				.replace(/[úùüû]/g, "u")
				.replace(/[ñ]/g, "n")
				.replace(/[^a-z0-9\-]/g, "")
				.replace(/\.pdf$/, "")
				.substring(0, 30);
		};

		const dbPdfs = await PDFContent.find({ isActive: true })
			.select("_id filename uploadDate")
			.sort({ uploadDate: -1 });

		const idsInfo = dbPdfs.map((pdf) => ({
			originalId: pdf._id.toString(),
			descriptiveId: generateDescriptiveId(pdf.filename),
			filename: pdf.filename,
			uploadDate: pdf.uploadDate,
			// Mostrar cómo se vería en el mapeo
			mappingKey: `"${generateDescriptiveId(
				pdf.filename
			)}": "pdf-XXXXX.pdf", // ${pdf.filename}`,
		}));

		res.json({
			message: "IDs descriptivos para facilitar mapeo",
			totalPdfs: dbPdfs.length,
			idsInfo: idsInfo,
			instructions: "Usa descriptiveId para mapear archivos de forma más clara",
		});
	} catch (error) {
		res.status(500).json({
			error: "Error generando IDs descriptivos",
			details: error.message,
		});
	}
});

// Ruta de debug para verificar mapeo correcto
app.get("/api/debug/pdf-mapping", async (req, res) => {
	try {
		console.log("🔍 [DEBUG] Iniciando mapeo de PDFs...");

		// Obtener archivos físicos
		const uploadsDir = path.join(__dirname, "uploads");
		const physicalFiles = fs
			.readdirSync(uploadsDir)
			.filter((file) => file.endsWith(".pdf"));

		// Obtener PDFs de la base de datos
		const dbPdfs = await PDFContent.find({ isActive: true })
			.select("_id filename filePath uploadDate")
			.sort({ uploadDate: -1 });

		// Mapeo específico actualizado
		const specificMapping = {
			"Solicitud de Tarjeta.pdf": "pdf-1762839890353-607425718.pdf",
			"Solicitud de Prestamos.pdf": "pdf-1762839898137-325926996.pdf",
			"Pago de Servicios.pdf": "pdf-1762839910147-424431997.pdf",
			"Gestión de Chequeras.pdf": "pdf-1762839882812-24906428.pdf",
			"Manual de apertura de cuenta ejemplo.pdf":
				"pdf-1762839917088-443931258.pdf",
		};

		const idMapping = {
			"6913814a8717b6e77a788616": "pdf-1762839910147-424431997.pdf", // Pago de Servicios
			"6913815c8717b6e77a788622": "pdf-1762839890353-607425718.pdf", // Solicitud de Tarjeta
		};

		// Crear mapeo completo
		const mappingResults = dbPdfs.map((pdf) => {
			const mappedFile =
				idMapping[pdf._id.toString()] || specificMapping[pdf.filename];
			const exists = physicalFiles.includes(mappedFile);

			return {
				dbId: pdf._id,
				title: pdf.filename,
				originalPath: pdf.filePath,
				mappedFile: mappedFile,
				fileExists: exists,
				uploadDate: pdf.uploadDate,
			};
		});

		res.json({
			message: "Mapeo de PDFs - Debug",
			physicalFiles: physicalFiles,
			dbPdfs: dbPdfs.length,
			mappingResults: mappingResults,
			mappingTables: {
				byName: specificMapping,
				byId: idMapping,
			},
		});
	} catch (error) {
		console.error("❌ [DEBUG] Error en mapeo:", error);
		res.status(500).json({
			error: "Error en debug de mapeo",
			details: error.message,
		});
	}
});

// Endpoint para verificar inconsistencias
app.get("/api/debug/pdf-files", async (req, res) => {
	try {
		const pdfs = await PDFContent.find();
		const uploadsDir = path.join(__dirname, "uploads");
		const filesOnDisk = fs.existsSync(uploadsDir)
			? fs.readdirSync(uploadsDir)
			: [];

		const report = {
			totalPdfsInDB: pdfs.length,
			totalFilesOnDisk: filesOnDisk.length,
			filesOnDisk,
			inconsistencies: [],
		};

		for (const pdf of pdfs) {
			const fileExists = fs.existsSync(pdf.filePath);
			if (!fileExists) {
				report.inconsistencies.push({
					id: pdf._id,
					filename: pdf.filename,
					expectedPath: pdf.filePath,
					exists: false,
				});
			}
		}

		res.json(report);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Endpoint para activar/desactivar PDFs
app.post("/api/debug/toggle-pdf/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { isActive } = req.body;

		const pdf = await PDFContent.findByIdAndUpdate(
			id,
			{ isActive: isActive },
			{ new: true }
		);

		if (!pdf) {
			return res.status(404).json({ error: "PDF no encontrado" });
		}

		res.json({
			success: true,
			message: `PDF ${isActive ? "activado" : "desactivado"} correctamente`,
			pdf: {
				id: pdf._id,
				filename: pdf.filename,
				isActive: pdf.isActive,
				filePath: pdf.filePath,
			},
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Servir archivos estáticos del frontend
const frontendPath =
	process.env.NODE_ENV === "production"
		? path.join(__dirname, "../frontend")
		: path.join(__dirname, "../dist");

console.log(`📁 Sirviendo archivos estáticos desde: ${frontendPath}`);
console.log(
	`📁 Archivos disponibles:`,
	fs.existsSync(frontendPath)
		? fs.readdirSync(frontendPath)
		: "Directorio no existe"
);

// Middleware específico para archivos PWA
app.get("/manifest.json", (req, res) => {
	res.setHeader("Content-Type", "application/manifest+json");
	res.setHeader("Cache-Control", "public, max-age=604800"); // 1 semana
	res.sendFile(path.join(frontendPath, "manifest.json"));
});

app.get("/manifest.webmanifest", (req, res) => {
	res.setHeader("Content-Type", "application/manifest+json");
	res.setHeader("Cache-Control", "public, max-age=604800");
	res.sendFile(path.join(frontendPath, "manifest.webmanifest"));
});

app.get("/sw.js", (req, res) => {
	res.setHeader("Content-Type", "application/javascript");
	res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
	res.setHeader("Service-Worker-Allowed", "/");
	res.sendFile(path.join(frontendPath, "sw.js"));
});

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

// Servir archivos estáticos del frontend después de exponer las rutas de PDF
app.use(
	express.static(frontendPath, {
		setHeaders: (res, path, stat) => {
			// Headers específicos para archivos PDF
			if (path.endsWith(".pdf")) {
				res.setHeader("Content-Type", "application/pdf");
				res.setHeader("X-Content-Type-Options", "nosniff");
				res.setHeader(
					"Content-Security-Policy",
					"frame-src 'self' data: blob:"
				);
			}
			// Headers para archivos HTML
			if (path.endsWith(".html")) {
				res.setHeader("X-Frame-Options", "SAMEORIGIN");
				res.setHeader("X-Content-Type-Options", "nosniff");
			}
		},
	})
);

// Conectar a MongoDB
const mongoUri =
	process.env.MONGODB_URI || "mongodb://localhost:27017/bamconect360";
console.log(
	"🔗 Intentando conectar a MongoDB:",
	mongoUri.replace(/\/\/.*@/, "//***@")
);

mongoose
	.connect(mongoUri)
	.then(() => {
		console.log("✅ Conectado a MongoDB exitosamente");
		loadTrainingContent();
	})
	.catch((err) => {
		console.error("❌ Error conectando a MongoDB:", err.message);
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

// Ruta básica de verificación
app.get("/", (req, res) => {
	try {
		res.status(200).json({
			status: "OK",
			message: "BamConect360 API está funcionando",
			timestamp: new Date().toISOString(),
			environment: process.env.NODE_ENV || "development",
			port: PORT,
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
			mongodb:
				mongoose.connection.readyState === 1 ? "Conectado" : "Desconectado",
			openai: openai ? "Configurado" : "No configurado",
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error en health check:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
});

// Ruta para REEMPLAZAR un PDF existente con el archivo correcto
app.post("/api/replace-pdf/:id", upload.single("pdf"), async (req, res) => {
	try {
		const { id } = req.params;

		if (!req.file) {
			return res
				.status(400)
				.json({ error: "No se recibió ningún archivo PDF" });
		}

		// Buscar el PDF existente
		const existingPdf = await PDFContent.findById(id);
		if (!existingPdf) {
			return res.status(404).json({ error: "PDF no encontrado" });
		}

		console.log(
			`🔄 [REPLACE PDF] Reemplazando: ${existingPdf.filename} (ID: ${id})`
		);

		// Parsear el nuevo archivo
		const pdfBuffer = fs.readFileSync(req.file.path);
		const pdfData = await pdfParse(pdfBuffer);

		// Actualizar el registro existente con el nuevo archivo
		existingPdf.content = pdfData.text;
		existingPdf.filePath = req.file.path;
		existingPdf.uploadDate = new Date();

		await existingPdf.save();

		console.log(
			`✅ [REPLACE PDF] Archivo reemplazado exitosamente: ${existingPdf.filename}`
		);
		console.log(`📂 [REPLACE PDF] Nueva ruta: ${req.file.path}`);

		res.json({
			message: "PDF reemplazado exitosamente",
			pdf: {
				_id: existingPdf._id,
				filename: existingPdf.filename,
				uploadDate: existingPdf.uploadDate,
				filePath: existingPdf.filePath,
				contentPreview: pdfData.text.substring(0, 200),
			},
		});
	} catch (error) {
		console.error("❌ [REPLACE PDF] Error:", error);
		res.status(500).json({
			error: "Error reemplazando el PDF",
			details: error.message,
		});
	}
});

// Ruta para obtener lista de PDFs con IDs para reemplazo
app.get("/api/pdfs-for-replacement", async (req, res) => {
	try {
		const pdfs = await PDFContent.find({ isActive: true })
			.select("_id filename uploadDate content filePath")
			.sort({ uploadDate: -1 });

		const pdfList = pdfs.map((pdf) => ({
			id: pdf._id,
			filename: pdf.filename,
			uploadDate: pdf.uploadDate,
			filePath: pdf.filePath,
			contentPreview: pdf.content.substring(0, 100),
			needsReplacement: !pdf.content
				.toLowerCase()
				.includes(
					pdf.filename
						.toLowerCase()
						.replace(".pdf", "")
						.replace(/\s+/g, "")
						.substring(0, 8)
				),
		}));

		res.json({
			message: "Lista de PDFs para reemplazo",
			pdfs: pdfList,
			instructions:
				"Usa POST /api/replace-pdf/:id para reemplazar cada archivo",
		});
	} catch (error) {
		console.error("❌ [REPLACEMENT LIST] Error:", error);
		res.status(500).json({ error: "Error obteniendo lista de PDFs" });
	}
});

// Ruta para subir PDFs
app.post("/api/upload-pdf", upload.single("pdf"), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ error: "No se ha subido ningún archivo" });
		}

		const pdfBuffer = fs.readFileSync(req.file.path);
		const pdfData = await pdfParse(pdfBuffer);

		if (!pdfData.text || pdfData.text.trim().length === 0) {
			return res
				.status(400)
				.json({ error: "El PDF no contiene texto legible" });
		}

		const pdfContent = new PDFContent({
			filename: req.file.originalname,
			content: pdfData.text,
			filePath: req.file.path,
			pdfBinary: pdfBuffer, // Guardar el PDF completo con formato original
		});

		await pdfContent.save();
		await loadTrainingContent();
		// No eliminamos el archivo PDF, lo mantenemos para servirlo después

		res.json({
			message: "PDF procesado y almacenado correctamente",
			filename: req.file.originalname,
			contentLength: pdfData.text.length,
		});
	} catch (error) {
		console.error("Error procesando PDF:", error);
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

// Ruta para obtener los datos JSON de un PDF específico
app.get("/api/pdf/:id/data", async (req, res) => {
	try {
		// Validar que el ID sea válido
		if (
			!req.params.id ||
			req.params.id === "undefined" ||
			req.params.id.length !== 24
		) {
			return res.status(400).json({ error: "ID de PDF inválido" });
		}

		const pdf = await PDFContent.findById(req.params.id);
		if (!pdf || !pdf.isActive) {
			return res.status(404).json({ error: "PDF no encontrado" });
		}

		// Devolver los datos JSON del PDF
		res.json({
			_id: pdf._id,
			filename: pdf.filename,
			content: pdf.content,
			uploadDate: pdf.uploadDate,
			averageRating: pdf.averageRating || 0,
			totalRatings: pdf.totalRatings || 0,
		});
	} catch (error) {
		console.error("Error obteniendo datos del PDF:", error);
		res.status(500).json({ error: "Error obteniendo los datos del PDF" });
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

// Ruta para agregar rating a un PDF
app.post("/api/pdfs/:id/rating", async (req, res) => {
	try {
		const { rating } = req.body;
		const pdfId = req.params.id;

		// Validar rating
		if (!rating || rating < 1 || rating > 5) {
			return res
				.status(400)
				.json({ error: "El rating debe ser un número entre 1 y 5" });
		}

		// Buscar el PDF
		const pdf = await PDFContent.findById(pdfId);
		if (!pdf) {
			return res.status(404).json({ error: "PDF no encontrado" });
		}

		// Obtener IP del usuario (para evitar ratings múltiples)
		const userIP = req.ip || req.connection.remoteAddress || "unknown";

		// Agregar nuevo rating
		pdf.ratings.push({
			rating: parseInt(rating),
			userIP: userIP,
			timestamp: new Date(),
		});

		// Calcular nuevo promedio
		const totalRatings = pdf.ratings.length;
		const sumRatings = pdf.ratings.reduce((sum, r) => sum + r.rating, 0);
		pdf.averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
		pdf.totalRatings = totalRatings;

		await pdf.save();

		res.json({
			message: "Rating agregado exitosamente",
			averageRating: Math.round(pdf.averageRating * 10) / 10,
			totalRatings: pdf.totalRatings,
		});
	} catch (error) {
		console.error("Error agregando rating:", error);
		res.status(500).json({ error: "Error agregando el rating" });
	}
});

// Ruta para obtener ratings de un PDF
app.get("/api/pdfs/:id/rating", async (req, res) => {
	try {
		const pdf = await PDFContent.findById(req.params.id);
		if (!pdf) {
			return res.status(404).json({ error: "PDF no encontrado" });
		}

		res.json({
			averageRating: Math.round(pdf.averageRating * 10) / 10,
			totalRatings: pdf.totalRatings,
			ratings: pdf.ratings.map((r) => ({
				rating: r.rating,
				timestamp: r.timestamp,
			})),
		});
	} catch (error) {
		console.error("Error obteniendo ratings:", error);
		res.status(500).json({ error: "Error obteniendo los ratings" });
	}
});

// Ruta principal del chatbot
app.post("/api/chat", async (req, res) => {
	try {
		const { message } = req.body;

		if (!message || message.trim().length === 0) {
			return res.status(400).json({ error: "El mensaje no puede estar vacío" });
		}

		if (!openai) {
			return res.json({
				response:
					"Lo siento, el servicio de chat no está disponible. OpenAI API Key no configurada.",
			});
		}

		if (trainingContent.length === 0) {
			return res.json({
				response:
					"Lo siento, aún no tengo documentos para consultar. Por favor, sube algunos PDFs primero para que pueda ayudarte.",
			});
		}

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
			messages: [{ role: "system", content: systemPrompt }],
			max_tokens: parseInt(process.env.MAX_TOKENS) || 1000,
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
			res.status(401).json({ error: "Clave de API de OpenAI inválida." });
		} else {
			res.status(500).json({
				error: "Error interno del servidor",
				details:
					process.env.NODE_ENV === "development" ? error.message : undefined,
			});
		}
	}
});

// Ruta para resetear el entrenamiento
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

// Ruta para limpiar todos los PDFs (útil para desarrollo)
app.delete("/api/reset-all-pdfs", async (req, res) => {
	try {
		await PDFContent.deleteMany({});
		trainingContent = "";
		res.json({ message: "Todos los PDFs eliminados correctamente" });
	} catch (error) {
		console.error("Error eliminando todos los PDFs:", error);
		res.status(500).json({ error: "Error eliminando todos los PDFs" });
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

// Ruta catch-all para React Router
app.get("*", (req, res) => {
	console.log(`🌍 Catch-all ruta: ${req.path}`);
	console.log(
		`🔍 Catch-all - ¿Empieza con /api?: ${req.path.startsWith("/api")}`
	);
	console.log(
		`🔍 Catch-all - ¿Empieza con /documents?: ${req.path.startsWith(
			"/documents"
		)}`
	);

	// Excluir rutas específicas que no deben ser manejadas por React Router
	if (
		req.path.startsWith("/api") ||
		req.path.startsWith("/documents") ||
		req.path.startsWith("/files")
	) {
		console.log(`❌ Ruta de API no encontrada: ${req.path}`);
		return res.status(404).json({ error: "Ruta de API no encontrada" });
	}

	const indexPath = path.join(frontendPath, "index.html");
	console.log(`📄 Sirviendo index.html desde: ${indexPath}`);
	console.log(`📄 ¿Archivo existe?`, fs.existsSync(indexPath));

	if (fs.existsSync(indexPath)) {
		res.sendFile(indexPath);
	} else {
		res.status(404).json({
			error: "Frontend no encontrado",
			path: indexPath,
			available: fs.existsSync(frontendPath)
				? fs.readdirSync(frontendPath)
				: "Dir no existe",
		});
	}
});

// Iniciar servidor
const server = app.listen(PORT, "0.0.0.0", () => {
	console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
	console.log(`📡 API disponible en http://localhost:${PORT}/api`);
	console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

// Manejo de errores del servidor
server.on("error", (error) => {
	if (error.code === "EADDRINUSE") {
		console.error(`❌ Puerto ${PORT} ya está en uso`);
	} else {
		console.error("❌ Error del servidor:", error);
	}
});

// Manejo graceful shutdown
process.on("SIGTERM", () => {
	console.log("🛑 Cerrando servidor...");
	server.close(() => {
		console.log("✅ Servidor cerrado correctamente");
		process.exit(0);
	});
});
