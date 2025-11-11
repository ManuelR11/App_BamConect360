import React, { useState, useEffect } from "react";
import logoImpresion from "../assets/logo-impresion.png";

// Detectar automáticamente la URL del backend
const API_BASE_URL =
	window.location.hostname === "localhost"
		? "http://localhost:3001/api"
		: `${window.location.protocol}//${window.location.host}/api`;

export default function PDFViewer() {
	const [pdfData, setPdfData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [filename, setFilename] = useState("");

	useEffect(() => {
		// Obtener el nombre del archivo desde la URL
		const urlParams = new URLSearchParams(window.location.search);
		const filenameParam = urlParams.get("filename");

		if (filenameParam) {
			setFilename(filenameParam);
			checkAndLoadPDF(filenameParam);
		} else {
			setError("No se especificó ningún archivo PDF");
			setLoading(false);
		}
	}, []);

	const checkAndLoadPDF = async (filename) => {
		try {
			// Verificar si el PDF existe en el servidor
			const response = await fetch(`${API_BASE_URL}/pdfs`);
			if (response.ok) {
				const pdfs = await response.json();
				const foundPdf = pdfs.find((pdf) => pdf.filename === filename);

				if (foundPdf) {
					setPdfData(foundPdf);
				} else {
					setError(
						`El archivo "${filename}" no se encontró en el servidor. Asegúrate de haberlo subido primero.`
					);
				}
			} else {
				setError("Error al conectar con el servidor");
			}
		} catch (error) {
			setError("Error de conexión con el servidor");
		} finally {
			setLoading(false);
		}
	};

	const BackIcon = () => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<polyline points="15,18 9,12 15,6" />
		</svg>
	);

	const UploadIcon = () => (
		<svg
			width="48"
			height="48"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
			<polyline points="14,2 14,8 20,8" />
			<line x1="16" y1="13" x2="8" y2="13" />
			<line x1="16" y1="17" x2="8" y2="17" />
		</svg>
	);

	if (loading) {
		return (
			<div
				style={{
					minHeight: "100vh",
					background: "#f9fafb",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div style={{ textAlign: "center" }}>
					<div
						style={{
							width: "60px",
							height: "60px",
							border: "4px solid #e5e7eb",
							borderTop: "4px solid #fbbf24",
							borderRadius: "50%",
							animation: "spin 1s linear infinite",
							margin: "0 auto 16px auto",
						}}
					/>
					<p style={{ color: "#6b7280", fontSize: "16px" }}>Cargando PDF...</p>
				</div>
				<style>
					{`
						@keyframes spin {
							0% { transform: rotate(0deg); }
							100% { transform: rotate(360deg); }
						}
					`}
				</style>
			</div>
		);
	}

	if (error) {
		return (
			<div
				style={{
					minHeight: "100vh",
					background: "#f9fafb",
					fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
					padding: "24px",
				}}
			>
				{/* Header */}
				<header
					style={{
						background: "white",
						borderBottom: "1px solid #e5e7eb",
						position: "sticky",
						top: 0,
						zIndex: 50,
						padding: "16px 0",
						boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
						marginBottom: "32px",
					}}
				>
					<div
						style={{
							maxWidth: "1200px",
							margin: "0 auto",
							padding: "0 24px",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
							<img
								src={logoImpresion}
								alt="Bam Logo"
								style={{
									width: "40px",
									height: "40px",
									borderRadius: "8px",
								}}
							/>
							<span
								style={{
									fontSize: "24px",
									fontWeight: "700",
									color: "#1f2937",
								}}
							>
								Bam
							</span>
						</div>
					</div>
				</header>

				<div
					style={{
						maxWidth: "800px",
						margin: "0 auto",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "center",
						minHeight: "60vh",
					}}
				>
					<button
						style={{
							display: "flex",
							alignItems: "center",
							gap: "8px",
							background: "#f3f4f6",
							color: "#1f2937",
							padding: "12px 20px",
							borderRadius: "50px",
							textDecoration: "none",
							fontWeight: "600",
							transition: "all 0.3s ease",
							border: "none",
							cursor: "pointer",
							marginBottom: "32px",
							boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
						}}
						onClick={() => (window.location.href = "/guias")}
						onMouseEnter={(e) => {
							e.target.style.transform = "scale(1.05)";
							e.target.style.background = "#e5e7eb";
						}}
						onMouseLeave={(e) => {
							e.target.style.transform = "scale(1)";
							e.target.style.background = "#f3f4f6";
						}}
					>
						<BackIcon />
						Volver a Guías
					</button>

					<div
						style={{
							background: "white",
							borderRadius: "20px",
							padding: "48px 32px",
							boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
							maxWidth: "500px",
							width: "100%",
						}}
					>
						<div
							style={{
								width: "80px",
								height: "80px",
								background: "linear-gradient(135deg, #ef4444, #dc2626)",
								borderRadius: "20px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								margin: "0 auto 24px auto",
								color: "white",
							}}
						>
							<UploadIcon />
						</div>

						<h2
							style={{
								fontSize: "24px",
								fontWeight: "700",
								color: "#1f2937",
								marginBottom: "16px",
							}}
						>
							PDF No Encontrado
						</h2>

						<p
							style={{
								color: "#6b7280",
								fontSize: "16px",
								lineHeight: "1.6",
								marginBottom: "24px",
							}}
						>
							{error}
						</p>

						<button
							style={{
								background: "linear-gradient(135deg, #fbbf24, #f97316)",
								color: "white",
								padding: "12px 24px",
								borderRadius: "50px",
								textDecoration: "none",
								fontWeight: "600",
								transition: "all 0.3s ease",
								border: "none",
								cursor: "pointer",
								fontSize: "16px",
							}}
							onClick={() => (window.location.href = "/pdf-manager")}
							onMouseEnter={(e) => {
								e.target.style.transform = "scale(1.05)";
							}}
							onMouseLeave={(e) => {
								e.target.style.transform = "scale(1)";
							}}
						>
							Ir a Gestor de PDFs
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (pdfData) {
		const pdfUrl = `${API_BASE_URL}/pdf/${pdfData._id}`;

		return (
			<div
				style={{
					minHeight: "100vh",
					background: "#f9fafb",
					fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
				}}
			>
				{/* Header */}
				<header
					style={{
						background: "white",
						borderBottom: "1px solid #e5e7eb",
						position: "sticky",
						top: 0,
						zIndex: 50,
						padding: "16px 0",
						boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
					}}
				>
					<div
						style={{
							maxWidth: "1200px",
							margin: "0 auto",
							padding: "0 24px",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
							<img
								src={logoImpresion}
								alt="Bam Logo"
								style={{
									width: "40px",
									height: "40px",
									borderRadius: "8px",
								}}
							/>
							<span
								style={{
									fontSize: "24px",
									fontWeight: "700",
									color: "#1f2937",
								}}
							>
								Bam
							</span>
						</div>
						<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
							<h2
								style={{
									fontSize: "18px",
									fontWeight: "600",
									color: "#1f2937",
									margin: 0,
								}}
							>
								{filename}
							</h2>
							<button
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									background: "#f3f4f6",
									color: "#1f2937",
									padding: "12px 20px",
									borderRadius: "50px",
									textDecoration: "none",
									fontWeight: "600",
									transition: "all 0.3s ease",
									border: "none",
									cursor: "pointer",
								}}
								onClick={() => (window.location.href = "/guias")}
								onMouseEnter={(e) => {
									e.target.style.transform = "scale(1.05)";
									e.target.style.background = "#e5e7eb";
								}}
								onMouseLeave={(e) => {
									e.target.style.transform = "scale(1)";
									e.target.style.background = "#f3f4f6";
								}}
							>
								<BackIcon />
								Volver a Guías
							</button>
						</div>
					</div>
				</header>

				{/* PDF Viewer */}
				<div style={{ padding: "16px" }}>
					<div
						style={{
							background: "white",
							borderRadius: "12px",
							overflow: "hidden",
							boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
						}}
					>
						<iframe
							src={pdfUrl}
							style={{
								width: "100%",
								height: "calc(100vh - 140px)",
								border: "none",
							}}
							title={`PDF Viewer - ${filename}`}
						/>
					</div>
				</div>
			</div>
		);
	}

	return null;
}
