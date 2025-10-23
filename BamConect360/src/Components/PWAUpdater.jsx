import { useState, useEffect } from "react";

const PWAUpdater = () => {
	const [needRefresh, setNeedRefresh] = useState(false);
	const [updateSW, setUpdateSW] = useState(null);

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			const registerSW = async () => {
				try {
					const { registerSW } = await import("virtual:pwa-register");
					const updateSW = registerSW({
						onNeedRefresh() {
							setNeedRefresh(true);
						},
						onOfflineReady() {
							console.log("App ready to work offline");
						},
					});
					setUpdateSW(() => updateSW);
				} catch (error) {
					console.log("PWA not available");
				}
			};

			registerSW();
		}
	}, []);

	const handleUpdate = () => {
		if (updateSW) {
			updateSW(true);
		}
	};

	if (!needRefresh) return null;

	return (
		<div
			style={{
				position: "fixed",
				bottom: "20px",
				right: "20px",
				backgroundColor: "#2563eb",
				color: "white",
				padding: "16px",
				borderRadius: "8px",
				boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
				zIndex: 1000,
				maxWidth: "300px",
			}}
		>
			<p style={{ margin: "0 0 12px 0", fontSize: "14px" }}>
				Nueva versión disponible
			</p>
			<div style={{ display: "flex", gap: "8px" }}>
				<button
					onClick={handleUpdate}
					style={{
						backgroundColor: "white",
						color: "#2563eb",
						border: "none",
						padding: "8px 16px",
						borderRadius: "4px",
						cursor: "pointer",
						fontSize: "12px",
						fontWeight: "500",
					}}
				>
					Actualizar
				</button>
				<button
					onClick={() => setNeedRefresh(false)}
					style={{
						backgroundColor: "transparent",
						color: "white",
						border: "1px solid white",
						padding: "8px 16px",
						borderRadius: "4px",
						cursor: "pointer",
						fontSize: "12px",
					}}
				>
					Más tarde
				</button>
			</div>
		</div>
	);
};

export default PWAUpdater;
