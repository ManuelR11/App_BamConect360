import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT) || 8080; // Railway usa puertos dinámicos

// Middleware básico
app.use(cors());
app.use(express.json());

// Ruta básica para test
app.get("/", (req, res) => {
    console.log(`📥 Request recibida en / - Puerto: ${PORT}`);
    res.status(200).json({
        status: "OK",
        message: "Servidor funcionando correctamente",
        port: PORT,
        env_port: process.env.PORT,
        timestamp: new Date().toISOString()
    });
});

app.get("/test", (req, res) => {
    console.log("📥 Request recibida en /test");
    res.status(200).send("Test OK - Railway deployment working!");
});

// Health check específico para Railway
app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
});

// Iniciar servidor - Railway requiere 0.0.0.0
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor SIMPLE funcionando en puerto ${PORT}`);
    console.log(`🌍 Listening on 0.0.0.0:${PORT}`);
    console.log(`📡 ENV PORT: ${process.env.PORT}`);
});

server.on('error', (error) => {
    console.error('❌ Error del servidor:', error);
});

// Manejo graceful de cierre
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM recibido, cerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor cerrado');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT recibido, cerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor cerrado');
        process.exit(0);
    });
});
