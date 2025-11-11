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
				bottom: "20px",
				right: "20px",
				backgroundColor: "rgba(107, 114, 128, 0.8)",
				color: "white",
				padding: "6px 8px",
				borderRadius: "20px",
				boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
				zIndex: 1000,
				cursor: "pointer",
				display: "flex",
				alignItems: "center",
				gap: "4px",
				fontSize: "11px",
				fontWeight: "400",
				opacity: 0.7,
				transition: "all 0.3s ease",
				backdropFilter: "blur(10px)",
			}}
			onClick={handleInstallClick}
			onMouseEnter={(e) => {
				e.target.style.opacity = "1";
				e.target.style.backgroundColor = "rgba(107, 114, 128, 0.9)";
			}}
			onMouseLeave={(e) => {
				e.target.style.opacity = "0.7";
				e.target.style.backgroundColor = "rgba(107, 114, 128, 0.8)";
			}}
		>
			<span style={{ fontSize: "10px" }}>📱</span>
		</div>
	);
};

export default InstallPWA;
