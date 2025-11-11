import React, { useState, useEffect } from "react";

// Detectar automáticamente la URL del backend
const API_BASE_URL =
	window.location.hostname === "localhost"
		? "http://localhost:3001/api"
		: `${window.location.protocol}//${window.location.host}/api`;

export default function PDFManager() {
	const [pdfs, setPdfs] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [serverStatus, setServerStatus] = useState("checking");

	useEffect(() => {
		checkServerHealth();
		loadPDFs();
	}, []);

	const checkServerHealth = async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/health`);
			if (response.ok) {
				setServerStatus("online");
			} else {
				setServerStatus("error");
			}
		} catch (error) {
			setServerStatus("offline");
		}
	};

	const loadPDFs = async () => {
		setLoading(true);
		try {
			const response = await fetch(`${API_BASE_URL}/pdfs`);
			if (response.ok) {
				const data = await response.json();
				setPdfs(data);
			}
		} catch (error) {
			console.error("Error cargando PDFs:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleFileUpload = async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		if (file.type !== "application/pdf") {
			alert("Por favor, selecciona solo archivos PDF");
			return;
		}

		if (file.size > 10 * 1024 * 1024) {
			alert("El archivo es demasiado grande. Máximo 10MB.");
			return;
		}

		setUploading(true);
		const formData = new FormData();
		formData.append("pdf", file);

		try {
			const response = await fetch(`${API_BASE_URL}/upload-pdf`, {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				const result = await response.json();
				alert(`PDF "${result.filename}" subido y procesado correctamente`);
				loadPDFs();
				event.target.value = ""; // Limpiar input
			} else {
				const error = await response.json();
				alert(`Error: ${error.error}`);
			}
		} catch (error) {
			console.error("Error subiendo PDF:", error);
			alert("Error de conexión con el servidor");
		} finally {
			setUploading(false);
		}
	};

	const deletePDF = async (id, filename) => {
		if (!window.confirm(`¿Estás seguro de eliminar "${filename}"?`)) {
			return;
		}

		try {
			const response = await fetch(`${API_BASE_URL}/pdfs/${id}`, {
				method: "DELETE",
			});

			if (response.ok) {
				alert("PDF eliminado correctamente");
				loadPDFs();
			} else {
				alert("Error eliminando el PDF");
			}
		} catch (error) {
			console.error("Error eliminando PDF:", error);
			alert("Error de conexión con el servidor");
		}
	};

	const resetTraining = async () => {
		if (
			!window.confirm(
				"¿Estás seguro de eliminar TODOS los documentos de entrenamiento?"
			)
		) {
			return;
		}

		try {
			const response = await fetch(`${API_BASE_URL}/reset-training`, {
				method: "POST",
			});

			if (response.ok) {
				alert("Entrenamiento reseteado correctamente");
				loadPDFs();
			} else {
				alert("Error reseteando el entrenamiento");
			}
		} catch (error) {
			console.error("Error reseteando:", error);
			alert("Error de conexión con el servidor");
		}
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleString("es-ES");
	};

	const getStatusColor = () => {
		switch (serverStatus) {
			case "online":
				return "#10b981";
			case "offline":
				return "#ef4444";
			case "error":
				return "#f59e0b";
			default:
				return "#6b7280";
		}
	};

	const getStatusText = () => {
		switch (serverStatus) {
			case "online":
				return "Servidor conectado";
			case "offline":
				return "Servidor desconectado";
			case "error":
				return "Error en servidor";
			default:
				return "Verificando...";
		}
	};

	return (
		<div
			style={{
				maxWidth: "800px",
				margin: "20px auto",
				padding: "20px",
				fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
			}}
		>
			<div
				style={{
					background: "white",
					borderRadius: "12px",
					padding: "24px",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
					marginBottom: "20px",
				}}
			>
				<h2
					style={{
						margin: "0 0 20px 0",
						color: "#1f2937",
						fontSize: "24px",
						fontWeight: "700",
					}}
				>
					Administrar Documentos del Chatbot
				</h2>

				{/* Estado del servidor */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						marginBottom: "24px",
						padding: "12px",
						background: "#f9fafb",
						borderRadius: "8px",
					}}
				>
					<div
						style={{
							width: "12px",
							height: "12px",
							borderRadius: "50%",
							background: getStatusColor(),
						}}
					></div>
					<span style={{ fontWeight: "500", color: "#374151" }}>
						{getStatusText()}
					</span>
				</div>

				{/* Subir PDF */}
				<div
					style={{
						border: "2px dashed #d1d5db",
						borderRadius: "8px",
						padding: "32px",
						textAlign: "center",
						marginBottom: "24px",
						background: "#fafafa",
					}}
				>
					<div style={{ marginBottom: "16px" }}>
						<svg
							width="48"
							height="48"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#6b7280"
							strokeWidth="2"
							style={{ margin: "0 auto" }}
						>
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
							<polyline points="14,2 14,8 20,8" />
							<line x1="16" y1="13" x2="8" y2="13" />
							<line x1="16" y1="17" x2="8" y2="17" />
							<polyline points="10,9 9,9 8,9" />
						</svg>
					</div>
					<h3
						style={{
							margin: "0 0 8px 0",
							color: "#374151",
							fontSize: "18px",
							fontWeight: "600",
						}}
					>
						Subir documento PDF
					</h3>
					<p
						style={{
							margin: "0 0 16px 0",
							color: "#6b7280",
							fontSize: "14px",
						}}
					>
						Sube documentos PDF para entrenar el chatbot. Máximo 10MB por
						archivo.
					</p>
					<input
						type="file"
						accept=".pdf"
						onChange={handleFileUpload}
						disabled={uploading || serverStatus !== "online"}
						style={{
							margin: "0 auto",
							display: "block",
							padding: "8px",
							border: "1px solid #d1d5db",
							borderRadius: "6px",
							fontSize: "14px",
						}}
					/>
					{uploading && (
						<p
							style={{
								margin: "16px 0 0 0",
								color: "#2563eb",
								fontSize: "14px",
								fontWeight: "500",
							}}
						>
							Subiendo y procesando...
						</p>
					)}
				</div>

				{/* Lista de PDFs */}
				<div>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<h3
							style={{
								margin: 0,
								color: "#374151",
								fontSize: "18px",
								fontWeight: "600",
							}}
						>
							Documentos cargados ({pdfs.length})
						</h3>
						{pdfs.length > 0 && (
							<button
								onClick={resetTraining}
								style={{
									background: "#ef4444",
									color: "white",
									border: "none",
									padding: "8px 16px",
									borderRadius: "6px",
									fontSize: "14px",
									cursor: "pointer",
									fontWeight: "500",
								}}
								onMouseEnter={(e) => (e.target.style.background = "#dc2626")}
								onMouseLeave={(e) => (e.target.style.background = "#ef4444")}
							>
								Eliminar todos
							</button>
						)}
					</div>

					{loading ? (
						<p style={{ color: "#6b7280", fontStyle: "italic" }}>Cargando...</p>
					) : pdfs.length === 0 ? (
						<p
							style={{
								color: "#6b7280",
								fontStyle: "italic",
								textAlign: "center",
								padding: "40px",
								background: "#f9fafb",
								borderRadius: "8px",
							}}
						>
							No hay documentos cargados. Sube algunos PDFs para entrenar el
							chatbot.
						</p>
					) : (
						<div
							style={{ display: "flex", flexDirection: "column", gap: "8px" }}
						>
							{pdfs.map((pdf) => (
								<div
									key={pdf._id}
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										padding: "12px 16px",
										background: "#f9fafb",
										borderRadius: "8px",
										border: "1px solid #e5e7eb",
									}}
								>
									<div>
										<div
											style={{
												fontWeight: "500",
												color: "#374151",
												marginBottom: "4px",
											}}
										>
											{pdf.filename}
										</div>
										<div
											style={{
												fontSize: "12px",
												color: "#6b7280",
											}}
										>
											Subido: {formatDate(pdf.uploadDate)}
										</div>
									</div>
									<button
										onClick={() => deletePDF(pdf._id, pdf.filename)}
										style={{
											background: "#ef4444",
											color: "white",
											border: "none",
											padding: "6px 12px",
											borderRadius: "4px",
											fontSize: "12px",
											cursor: "pointer",
										}}
										onMouseEnter={(e) =>
											(e.target.style.background = "#dc2626")
										}
										onMouseLeave={(e) =>
											(e.target.style.background = "#ef4444")
										}
									>
										Eliminar
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
