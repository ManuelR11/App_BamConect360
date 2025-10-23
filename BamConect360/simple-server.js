import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT) || 3001;

// Middleware básico
app.use(cors());
app.use(express.json());

// Ruta básica para test
app.get("/", (req, res) => {
    console.log("📥 Request recibida en /");
    res.status(200).json({
        status: "OK",
        message: "Servidor funcionando correctamente",
        port: PORT,
        timestamp: new Date().toISOString()
    });
});

app.get("/test", (req, res) => {
    console.log("📥 Request recibida en /test");
    res.status(200).send("Test OK");
});

// Iniciar servidor
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor simple funcionando en puerto ${PORT}`);
    console.log(`🌍 Listening on 0.0.0.0:${PORT}`);
});

server.on('error', (error) => {
    console.error('❌ Error del servidor:', error);
});

process.on('SIGTERM', () => {
    console.log('🛑 Cerrando servidor...');
    server.close(() => {
        process.exit(0);
    });
});
