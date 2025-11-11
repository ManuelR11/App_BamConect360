import React from "react";
import { ArrowLeft, FileText, Download, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoImpresion from "../assets/logo-impresion.png";

const AperturaCuentaView = ({ onBack }) => {
	// Ruta del PDF en tu repositorio (ajústala según tu estructura de carpetas)
	const pdfUrl = "/docs/apertura-cuenta-guia.pdf";
	const navigate = useNavigate();

	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = pdfUrl;
		link.download = "Guia-Apertura-Cuenta-BAM.pdf";
		link.click();
	};

	const handlePrint = () => {
		window.print();
	};

	const styles = {
		container: {
			minHeight: "100vh",
			background:
				"linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%)",
			fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
		},
		// Header actualizado del segundo código
		header: {
			background: "rgba(255, 255, 255, 0.8)",
			backdropFilter: "blur(20px)",
			borderBottom: "1px solid rgba(229, 231, 235, 0.5)",
			position: "sticky",
			top: 0,
			zIndex: 50,
			padding: "16px 0",
		},
		headerContent: {
			maxWidth: "1200px",
			margin: "0 auto",
			padding: "0 24px",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
		logo: {
			display: "flex",
			alignItems: "center",
			gap: "12px",
		},
		logoIcon: {
			width: "40px",
			height: "40px",
			background: "linear-gradient(135deg, #fbbf24, #f97316)",
			borderRadius: "8px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			position: "relative",
		},
		logoIconInner: {
			width: "24px",
			height: "24px",
			background: "white",
			borderRadius: "4px",
			opacity: 0.9,
		},
		logoText: {
			fontSize: "24px",
			fontWeight: "700",
			color: "#1f2937",
		},
		userInfo: {
			display: "flex",
			alignItems: "center",
			gap: "12px",
		},
		userAvatar: {
			width: "40px",
			height: "40px",
			borderRadius: "50%",
			background: "linear-gradient(135deg, #60a5fa, #a855f7)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: "white",
			fontWeight: "600",
			fontSize: "14px",
		},
		heroSection: {
			background: "linear-gradient(135deg, #fbbf24, #f97316)",
			padding: "80px 24px",
			position: "relative",
			overflow: "hidden",
		},
		heroContent: {
			maxWidth: "1200px",
			margin: "0 auto",
			position: "relative",
			zIndex: 10,
		},
		backButton: {
			display: "flex",
			alignItems: "center",
			gap: "8px",
			background: "rgba(255, 255, 255, 0.9)",
			color: "#1f2937",
			padding: "12px 20px",
			borderRadius: "50px",
			textDecoration: "none",
			fontWeight: "600",
			transition: "all 0.3s ease",
			border: "none",
			cursor: "pointer",
			marginBottom: "40px",
			boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
			alignSelf: "flex-start",
		},
		heroTitle: {
			fontSize: "48px",
			fontWeight: "700",
			color: "#1f2937",
			textAlign: "center",
			margin: "0 0 16px 0",
			letterSpacing: "-0.02em",
		},
		heroSubtitle: {
			fontSize: "18px",
			color: "#4b5563",
			textAlign: "center",
			margin: "0 0 32px 0",
			maxWidth: "700px",
			marginLeft: "auto",
			marginRight: "auto",
		},
		actionButtonsContainer: {
			display: "flex",
			justifyContent: "center",
			gap: "16px",
		},
		downloadBtn: {
			display: "flex",
			alignItems: "center",
			gap: "8px",
			padding: "12px 24px",
			borderRadius: "50px",
			fontWeight: "600",
			cursor: "pointer",
			transition: "all 0.3s ease",
			border: "none",
			fontSize: "14px",
			backgroundColor: "rgba(255, 255, 255, 0.2)",
			color: "#1f2937",
			backdropFilter: "blur(4px)",
			boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
		},
		printBtn: {
			display: "flex",
			alignItems: "center",
			gap: "8px",
			padding: "12px 24px",
			borderRadius: "50px",
			fontWeight: "600",
			cursor: "pointer",
			transition: "all 0.3s ease",
			border: "none",
			fontSize: "14px",
			backgroundColor: "rgba(255, 255, 255, 0.1)",
			color: "#1f2937",
			backdropFilter: "blur(4px)",
			boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
		},
		mainContent: {
			backgroundColor: "transparent",
			minHeight: "100vh",
		},
		contentContainer: {
			maxWidth: "1200px",
			margin: "0 auto",
			padding: "60px 24px",
		},
		sectionTitle: {
			fontSize: "32px",
			fontWeight: "700",
			color: "#1f2937",
			textAlign: "center",
			margin: "0 0 16px 0",
			letterSpacing: "-0.02em",
		},
		sectionSubtitle: {
			fontSize: "16px",
			color: "#6b7280",
			textAlign: "center",
			margin: "0 0 40px 0",
			lineHeight: "1.6",
		},
		pdfContainer: {
			backgroundColor: "white",
			borderRadius: "20px",
			overflow: "hidden",
			marginBottom: "40px",
			boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
			border: "2px solid transparent",
		},
		pdfHeader: {
			backgroundColor: "white",
			padding: "24px",
			borderBottom: "1px solid #e5e7eb",
		},
		pdfHeaderContent: {
			display: "flex",
			alignItems: "center",
			gap: "12px",
		},
		pdfHeaderTitle: {
			fontSize: "18px",
			fontWeight: "700",
			color: "#1f2937",
			margin: "0 0 4px 0",
		},
		pdfHeaderSubtitle: {
			color: "#6b7280",
			margin: 0,
			fontSize: "14px",
		},
		pdfViewerContainer: {
			position: "relative",
			backgroundColor: "#f3f4f6",
		},
		pdfIframe: {
			width: "100%",
			height: "800px",
			border: "none",
		},
		loadingFallback: {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: "#f3f4f6",
			zIndex: -1,
		},
		loadingContent: {
			textAlign: "center",
		},
		loadingIcon: {
			width: "64px",
			height: "64px",
			backgroundColor: "#f97316",
			borderRadius: "16px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			margin: "0 auto 16px auto",
		},
		loadingTitle: {
			fontSize: "18px",
			fontWeight: "700",
			color: "#1f2937",
			margin: "0 0 8px 0",
		},
		loadingSubtitle: {
			color: "#6b7280",
			margin: 0,
			fontSize: "14px",
		},
		infoCards: {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
			gap: "24px",
		},
		infoCard: {
			backgroundColor: "white",
			padding: "32px 24px",
			borderRadius: "20px",
			textAlign: "center",
			boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
			border: "2px solid transparent",
			transition: "all 0.3s ease",
		},
		cardIcon: {
			width: "64px",
			height: "64px",
			borderRadius: "16px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			margin: "0 auto 16px auto",
			fontSize: "32px",
		},
		blueIcon: {
			backgroundColor: "#3b82f6",
		},
		greenIcon: {
			backgroundColor: "#10b981",
		},
		purpleIcon: {
			backgroundColor: "#8b5cf6",
		},
		cardTitle: {
			fontSize: "18px",
			fontWeight: "700",
			color: "#1f2937",
			margin: "0 0 8px 0",
		},
		cardText: {
			color: "#6b7280",
			margin: "0 0 16px 0",
			lineHeight: "1.5",
			fontSize: "14px",
		},
		cardTag: {
			backgroundColor: "#f3f4f6",
			color: "#6b7280",
			padding: "6px 12px",
			borderRadius: "20px",
			fontSize: "12px",
			fontWeight: "600",
			textTransform: "uppercase",
			letterSpacing: "0.5px",
		},
	};

	return (
		<div style={styles.container}>
			{/* Header actualizado */}
			<header style={styles.header}>
				<div style={styles.headerContent}>
					<div style={styles.logo}>
						<img
							src={logoImpresion}
							alt="Bam Logo"
							style={{
								width: "40px",
								height: "40px",
								borderRadius: "8px",
							}}
						/>
						<span style={styles.logoText}>Bam</span>
					</div>
					<div style={styles.userInfo}>
						<div style={styles.userAvatar}>A</div>
						<span style={{ color: "#6b7280" }}>Adriana</span>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<div style={styles.heroSection}>
				<div style={styles.heroContent}>
					<button
						style={styles.backButton}
						onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
						onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
						onClick={() => navigate("/")}
					>
						<ArrowLeft size={16} />
						Volver a Bam Conecta 360
					</button>

					<h1 style={styles.heroTitle}>Apertura de cuenta</h1>
					<p style={styles.heroSubtitle}>
						Accede a documentación completa y actualizada para todos tus
						procesos de trabajo.
					</p>

					<div style={styles.actionButtonsContainer}>
						<button
							onClick={handleDownload}
							style={styles.downloadBtn}
							onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
							onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
						>
							<Download size={16} />
							Descargar PDF
						</button>
						<button
							onClick={handlePrint}
							style={styles.printBtn}
							onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
							onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
						>
							<Printer size={16} />
							Imprimir
						</button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div style={styles.mainContent}>
				<div style={styles.contentContainer}>
					<h2 style={styles.sectionTitle}>Guía de Apertura de Cuenta</h2>
					<p style={styles.sectionSubtitle}>
						Encuentra todos los recursos en un solo lugar. Recuerda que siempre
						puedes acercarte a tus
						<br />
						compañeros o supervisores para resolver consultas, si necesitas
						algo, ¡comunícalo!
					</p>

					{/* PDF Container */}
					<div style={styles.pdfContainer}>
						<div style={styles.pdfHeader}>
							<div style={styles.pdfHeaderContent}>
								<FileText size={24} color="#f97316" />
								<div>
									<h3 style={styles.pdfHeaderTitle}>Documento de referencia</h3>
									<p style={styles.pdfHeaderSubtitle}>
										Sigue estos pasos para completar tu apertura de cuenta
									</p>
								</div>
							</div>
						</div>

						<div style={styles.pdfViewerContainer}>
							<iframe
								src={pdfUrl}
								style={styles.pdfIframe}
								title="Guía de Apertura de Cuenta"
							/>

							<div style={styles.loadingFallback}>
								<div style={styles.loadingContent}>
									<div style={styles.loadingIcon}>
										<FileText size={32} color="white" />
									</div>
									<h3 style={styles.loadingTitle}>Cargando documento...</h3>
									<p style={styles.loadingSubtitle}>
										Preparando tu guía de apertura de cuenta
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Info Cards */}
					<div style={styles.infoCards}>
						<div style={styles.infoCard}>
							<div style={{ ...styles.cardIcon, ...styles.blueIcon }}>
								<span>📋</span>
							</div>
							<h3 style={styles.cardTitle}>Documentos necesarios</h3>
							<p style={styles.cardText}>
								DPI vigente, comprobante de ingresos y comprobante de dirección
							</p>
							<span style={styles.cardTag}>Requisitos</span>
						</div>

						<div style={styles.infoCard}>
							<div style={{ ...styles.cardIcon, ...styles.greenIcon }}>
								<span>⏱️</span>
							</div>
							<h3 style={styles.cardTitle}>Tiempo estimado</h3>
							<p style={styles.cardText}>
								El proceso completo toma entre 15 y 30 minutos
							</p>
							<span style={styles.cardTag}>Duración</span>
						</div>

						<div style={styles.infoCard}>
							<div style={{ ...styles.cardIcon, ...styles.purpleIcon }}>
								<span>🏦</span>
							</div>
							<h3 style={styles.cardTitle}>Disponibilidad</h3>
							<p style={styles.cardText}>
								Servicio disponible en todas las agencias BAM del país
							</p>
							<span style={styles.cardTag}>Ubicación</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AperturaCuentaView;
