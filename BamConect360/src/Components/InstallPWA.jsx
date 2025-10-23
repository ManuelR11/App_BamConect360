import { useState, useEffect } from "react";

const InstallPWA = () => {
	const [deferredPrompt, setDeferredPrompt] = useState(null);
	const [isInstallable, setIsInstallable] = useState(false);

	useEffect(() => {
		const handleBeforeInstallPrompt = (e) => {
			// Prevenir que el navegador muestre el prompt automáticamente
			e.preventDefault();
			setDeferredPrompt(e);
			setIsInstallable(true);
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt
			);
		};
	}, []);

	const handleInstallClick = async () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;

			if (outcome === "accepted") {
				console.log("PWA installation accepted");
			} else {
				console.log("PWA installation declined");
			}

			setDeferredPrompt(null);
			setIsInstallable(false);
		}
	};

	if (!isInstallable) return null;

	return (
		<div
			style={{
				position: "fixed",
				top: "20px",
				right: "20px",
				backgroundColor: "#10b981",
				color: "white",
				padding: "12px 16px",
				borderRadius: "8px",
				boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
				zIndex: 1000,
				cursor: "pointer",
				display: "flex",
				alignItems: "center",
				gap: "8px",
				fontSize: "14px",
				fontWeight: "500",
			}}
			onClick={handleInstallClick}
		>
			<span>📱</span>
			Instalar App
		</div>
	);
};

export default InstallPWA;
