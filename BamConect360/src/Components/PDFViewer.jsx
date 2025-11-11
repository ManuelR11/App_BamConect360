import React, { useState, useEffect } from "react";
import logoImpresion from "../assets/logo-impresion.png";

// Detectar automáticamente la URL del backend
const API_BASE_URL =
	window.location.hostname === "localhost"
		? "http://localhost:3001/api"
		: `${window.location.origin}/api`;

// URL específica para servir PDFs (evita conflictos con React Router)
const PDF_SERVE_URL =
	window.location.hostname === "localhost"
		? "http://localhost:3001/files"
		: `${window.location.origin}/files`;

export default function PDFViewer() {
	const [pdfData, setPdfData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [filename, setFilename] = useState("");
	const [pdfBase64, setPdfBase64] = useState(null);
	const [rating, setRating] = useState(0);
	const [hoveredStar, setHoveredStar] = useState(0);
	const [userRating, setUserRating] = useState(0);
	const [hasRated, setHasRated] = useState(false);
	const [averageRating, setAverageRating] = useState(0);
	const [totalRatings, setTotalRatings] = useState(0);
	const [showRatingSuccess, setShowRatingSuccess] = useState(false);
	const [iframeError, setIframeError] = useState(false);

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
			console.log("🔍 Buscando PDF:", filename);
			console.log("🌐 API URL:", `${API_BASE_URL}/pdfs`);
			// Verificar si el PDF existe en el servidor
			const response = await fetch(`${API_BASE_URL}/pdfs`);
			console.log("📡 Response status:", response.status);
			if (response.ok) {
				const pdfs = await response.json();
				console.log("📚 PDFs encontrados:", pdfs.length);
				const foundPdf = pdfs.find((pdf) => pdf.filename === filename);
				console.log("🎯 PDF encontrado:", foundPdf);

				if (foundPdf) {
					console.log("📋 Intentando obtener detalles del PDF:", foundPdf._id);
					// Obtener los detalles completos del PDF
					const pdfResponse = await fetch(
						`${API_BASE_URL}/pdf/${foundPdf._id}/data`
					);
					console.log("📋 Response status para detalles:", pdfResponse.status);
					if (pdfResponse.ok) {
						const pdfDetails = await pdfResponse.json();
						console.log("📋 Detalles del PDF obtenidos:", pdfDetails);
						setPdfData(pdfDetails);
						// Cargar datos de rating
						loadRatingData(foundPdf._id);
						// Cargar PDF como Base64
						loadPdfAsBase64(foundPdf._id);
					} else {
						console.log(
							"⚠️ No se pudieron obtener detalles, usando datos básicos"
						);
						setPdfData(foundPdf);
						loadRatingData(foundPdf._id);
						// Cargar PDF como Base64
						loadPdfAsBase64(foundPdf._id);
					}
				} else {
					setError(
						`El archivo "${filename}" no se encontró en el servidor. Asegúrate de haberlo subido primero.`
					);
				}
			} else {
				setError("Error al conectar con el servidor");
			}
		} catch (error) {
			console.error("Error:", error);
			setError("Error de conexión con el servidor");
		} finally {
			setLoading(false);
		}
	};

	const handleStarClick = async (starValue) => {
		if (hasRated) return; // No permitir rating múltiple

		setUserRating(starValue);
		setHasRated(true);
		setShowRatingSuccess(true);

		try {
			// Enviar rating al servidor
			const response = await fetch(
				`${API_BASE_URL}/pdfs/${pdfData._id}/rating`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ rating: starValue }),
				}
			);

			if (response.ok) {
				const result = await response.json();
				setAverageRating(result.averageRating);
				setTotalRatings(result.totalRatings);

				// Ocultar mensaje de éxito después de 3 segundos
				setTimeout(() => {
					setShowRatingSuccess(false);
				}, 3000);
			}
		} catch (error) {
			console.error("Error enviando rating:", error);
			setHasRated(false);
			setUserRating(0);
		}
	};

	const handleStarHover = (starValue) => {
		if (!hasRated) {
			setHoveredStar(starValue);
		}
	};

	const handleStarLeave = () => {
		if (!hasRated) {
			setHoveredStar(0);
		}
	};

	const loadRatingData = async (pdfId) => {
		try {
			const response = await fetch(`${API_BASE_URL}/pdfs/${pdfId}/rating`);
			if (response.ok) {
				const data = await response.json();
				setAverageRating(data.averageRating || 0);
				setTotalRatings(data.totalRatings || 0);
			}
		} catch (error) {
			console.error("Error cargando datos de rating:", error);
		}
	};

	const loadPdfAsBase64 = async (pdfId) => {
		try {
			console.log("📄 Cargando PDF como Base64:", pdfId);
			const response = await fetch(`${API_BASE_URL}/pdf/${pdfId}/base64`);
			if (response.ok) {
				const data = await response.json();
				console.log("📄 PDF Base64 cargado exitosamente");
				// Guardar el data URL completo, no solo el Base64
				const fullDataUrl = `data:application/pdf;base64,${data.base64}`;
				setPdfBase64(fullDataUrl);
			} else {
				console.error("❌ Error cargando PDF como Base64:", response.status);
			}
		} catch (error) {
			console.error("❌ Error cargando PDF como Base64:", error);
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

	const StarIcon = ({
		filled,
		size = 24,
		onClick,
		onMouseEnter,
		onMouseLeave,
	}) => (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill={filled ? "#fbbf24" : "none"}
			stroke={filled ? "#fbbf24" : "#d1d5db"}
			strokeWidth="2"
			style={{
				cursor: hasRated ? "default" : "pointer",
				transition: "all 0.2s ease",
				transform: filled ? "scale(1.1)" : "scale(1)",
			}}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
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
				</header>

				{/* Main Content */}
				<div
					style={{
						maxWidth: "1000px",
						margin: "0 auto",
						padding: "48px 24px",
					}}
				>
					{/* PDF Info */}
					<div
						style={{
							textAlign: "center",
							marginBottom: "32px",
						}}
					>
						<h1
							style={{
								fontSize: "36px",
								fontWeight: "800",
								color: "#1f2937",
								marginBottom: "16px",
								lineHeight: "1.2",
							}}
						>
							{filename.replace(".pdf", "")}
						</h1>

						<p
							style={{
								color: "#6b7280",
								fontSize: "16px",
								marginBottom: "16px",
							}}
						>
							Guia y procedimiento bancario
						</p>

						<p
							style={{
								color: "#9ca3af",
								fontSize: "14px",
							}}
						>
							Subido el{" "}
							{new Date(pdfData.uploadDate).toLocaleDateString("es-ES", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
					</div>

					{/* PDF Viewer completo */}
					<div
						style={{
							background: "white",
							borderRadius: "16px",
							padding: "32px",
							boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
							marginBottom: "24px",
						}}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: "20px",
								borderBottom: "2px solid #f3f4f6",
								paddingBottom: "16px",
							}}
						>
							<h2
								style={{
									fontSize: "24px",
									fontWeight: "700",
									color: "#1f2937",
									margin: 0,
								}}
							>
								📁 Visualizador de PDF
							</h2>
							<a
								href={
									pdfBase64
										? pdfBase64
										: `${PDF_SERVE_URL}/${pdfData._id}`
								}
								target="_blank"
								rel="noopener noreferrer"
								style={{
									background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
									color: "white",
									padding: "8px 16px",
									borderRadius: "20px",
									textDecoration: "none",
									fontSize: "14px",
									fontWeight: "600",
									display: "flex",
									alignItems: "center",
									gap: "6px",
									transition: "all 0.3s ease",
								}}
								onMouseEnter={(e) => {
									e.target.style.transform = "scale(1.05)";
								}}
								onMouseLeave={(e) => {
									e.target.style.transform = "scale(1)";
								}}
							>
								🔗 Abrir en nueva pestaña
							</a>
						</div>

						<div
							style={{
								border: "2px solid #e5e7eb",
								borderRadius: "12px",
								overflow: "hidden",
								background: "#f8fafc",
							}}
						>
							{iframeError ? (
								<div
									style={{
										width: "100%",
										height: "600px",
										border: "2px dashed #e2e8f0",
										borderRadius: "8px",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "center",
										background: "#f8fafc",
										color: "#64748b",
									}}
								>
									<div style={{ fontSize: "48px", marginBottom: "16px" }}>📄</div>
									<div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
										Error cargando PDF
									</div>
									<div style={{ textAlign: "center", marginBottom: "16px" }}>
										El PDF no se puede mostrar en el navegador.<br />
										Puedes descargarlo usando el botón de arriba.
									</div>
									<button
										onClick={() => setIframeError(false)}
										style={{
											background: "#3b82f6",
											color: "white",
											border: "none",
											padding: "8px 16px",
											borderRadius: "6px",
											cursor: "pointer",
										}}
									>
										Intentar de nuevo
									</button>
								</div>
							) : (
								<iframe
									src={pdfBase64 || `${PDF_SERVE_URL}/${pdfData._id}`}
									onLoad={() => {
										console.log(
											"📄 PDF cargado en iframe:",
											pdfBase64
												? "Base64 Data URL"
												: `${PDF_SERVE_URL}/${pdfData._id}`
										);
										setIframeError(false);
									}}
									onError={() => {
										console.error(
											"❌ Error cargando PDF en iframe:",
											pdfBase64
												? "Base64 Data URL"
												: `${PDF_SERVE_URL}/${pdfData._id}`
										);
										setIframeError(true);
									}}
									style={{
										width: "100%",
										height: "600px",
										border: "none",
										display: "block",
									}}
									title={`PDF: ${filename}`}
									allow="fullscreen"
									sandbox="allow-same-origin allow-scripts allow-forms"
								/>
							)}
						</div>
					</div>

					{/* Rating Section */}
					<div
						style={{
							background: "white",
							borderRadius: "16px",
							padding: "32px",
							boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
							textAlign: "center",
						}}
					>
						<h3
							style={{
								fontSize: "20px",
								fontWeight: "700",
								color: "#1f2937",
								marginBottom: "8px",
							}}
						>
							⭐ Califica este documento
						</h3>

						<p
							style={{
								color: "#6b7280",
								fontSize: "14px",
								marginBottom: "24px",
							}}
						>
							Tu opinion nos ayuda a mejorar la calidad de nuestros documentos
						</p>

						{/* Stars */}
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								gap: "8px",
								marginBottom: "24px",
							}}
						>
							{[1, 2, 3, 4, 5].map((star) => (
								<StarIcon
									key={star}
									filled={
										hasRated
											? star <= userRating
											: star <= (hoveredStar || userRating)
									}
									size={32}
									onClick={() => handleStarClick(star)}
									onMouseEnter={() => handleStarHover(star)}
									onMouseLeave={handleStarLeave}
								/>
							))}
						</div>

						{/* Rating Info */}
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								gap: "16px",
								flexWrap: "wrap",
								marginBottom: "16px",
							}}
						>
							{averageRating > 0 && (
								<div
									style={{
										display: "flex",
										alignItems: "center",
										gap: "8px",
									}}
								>
									<StarIcon filled={true} size={16} />
									<span
										style={{
											color: "#374151",
											fontSize: "16px",
											fontWeight: "600",
										}}
									>
										{averageRating.toFixed(1)}
									</span>
									<span
										style={{
											color: "#6b7280",
											fontSize: "14px",
										}}
									>
										({totalRatings}{" "}
										{totalRatings === 1 ? "calificacion" : "calificaciones"})
									</span>
								</div>
							)}
						</div>

						{/* Success Message */}
						{showRatingSuccess && (
							<div
								style={{
									background: "linear-gradient(135deg, #10b981, #059669)",
									color: "white",
									padding: "12px 24px",
									borderRadius: "50px",
									fontSize: "14px",
									fontWeight: "600",
									display: "inline-block",
									animation: "fadeInScale 0.5s ease-out",
								}}
							>
								🎉 ¡Gracias por tu calificacion!
							</div>
						)}

						{/* Rating Status */}
						{hasRated && !showRatingSuccess && (
							<p
								style={{
									color: "#10b981",
									fontSize: "14px",
									fontWeight: "600",
								}}
							>
								✅ Ya has calificado este documento
							</p>
						)}

						{!hasRated && (
							<p
								style={{
									color: "#9ca3af",
									fontSize: "12px",
								}}
							>
								Haz clic en una estrella para calificar
							</p>
						)}
					</div>
				</div>

				{/* Animaciones CSS */}
				<style>
					{`
						@keyframes fadeInScale {
							0% {
								opacity: 0;
								transform: scale(0.8);
							}
							100% {
								opacity: 1;
								transform: scale(1);
							}
						}
					`}
				</style>
			</div>
		);
	}

	return null;
}
