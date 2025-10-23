import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SVG base para el icono
const iconSVG = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Fondo con gradiente -->
  <rect width="512" height="512" rx="128" fill="url(#grad1)"/>
  
  <!-- Círculo central -->
  <circle cx="256" cy="200" r="60" stroke="white" stroke-width="12" fill="none"/>
  
  <!-- Texto BC360 -->
  <text x="256" y="320" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="56" font-weight="bold">BC360</text>
  
  <!-- Líneas decorativas -->
  <path d="M256 140 L256 80 M176 200 L116 200 M336 200 L396 200 M206 250 L166 290 M306 250 L346 290" 
        stroke="white" stroke-width="8" stroke-linecap="round"/>
  
  <!-- Puntos decorativos -->
  <circle cx="200" cy="120" r="6" fill="white"/>
  <circle cx="312" cy="120" r="6" fill="white"/>
  <circle cx="140" cy="160" r="6" fill="white"/>
  <circle cx="372" cy="160" r="6" fill="white"/>
</svg>`;

// Tamaños de iconos necesarios (incluye específicos para iPad/iOS)
const iconSizes = [57, 60, 72, 76, 96, 114, 120, 128, 144, 152, 167, 192, 384, 512];
const iconsDir = path.join(__dirname, "public", "icons");

// Asegurar que el directorio existe
if (!fs.existsSync(iconsDir)) {
	fs.mkdirSync(iconsDir, { recursive: true });
}

console.log("🎨 Generando iconos PNG para PWA...");

// Generar iconos para cada tamaño
const generateIcons = async () => {
	try {
		for (const size of iconSizes) {
			const filename = `icon-${size}x${size}.png`;
			const filepath = path.join(iconsDir, filename);

			await sharp(Buffer.from(iconSVG))
				.resize(size, size)
				.png({
					quality: 100,
					compressionLevel: 9,
				})
				.toFile(filepath);

			console.log(`✅ Generado: ${filename} (${size}x${size})`);
		}

		// Generar también un favicon
		await sharp(Buffer.from(iconSVG))
			.resize(32, 32)
			.png()
			.toFile(path.join(__dirname, "public", "favicon.png"));

		console.log("✅ Generado: favicon.png (32x32)");

		// Generar apple-touch-icon
		await sharp(Buffer.from(iconSVG))
			.resize(180, 180)
			.png()
			.toFile(path.join(__dirname, "public", "apple-touch-icon.png"));

		console.log("✅ Generado: apple-touch-icon.png (180x180)");

		console.log("");
		console.log("🎉 ¡Todos los iconos PNG generados exitosamente!");
		console.log("📱 Tu PWA ahora puede ser instalada correctamente");
		console.log("");
		console.log("📋 Próximos pasos:");
		console.log("1. npm run build");
		console.log("2. npm run preview");
		console.log("3. Probar instalación en el navegador");
	} catch (error) {
		console.error("❌ Error generando iconos:", error);
	}
};

generateIcons();
