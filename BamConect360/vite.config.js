import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.png", "apple-touch-icon.png", "icons/*.png"],
			manifest: false, // Usar el manifest.json externo
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg,pdf}"],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/api\./,
						handler: "NetworkFirst",
						options: {
							cacheName: "api-cache",
							networkTimeoutSeconds: 10,
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
						handler: "CacheFirst",
						options: {
							cacheName: "images-cache",
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
							},
						},
					},
				],
			},
		}),
	],
});
