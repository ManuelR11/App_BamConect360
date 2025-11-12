import React, { useState, useEffect } from "react";
import logoImpresion from "../assets/logo-impresion.png";

export default function GuiasProcedimientos() {
	const [hoveredCard, setHoveredCard] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const PiggyBankIcon = () => (
		<svg
			width="48"
			height="48"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M12 20V8a4 4 0 0 1 8 0v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h4z" />
			<circle cx="16" cy="8" r="2" />
			<path d="M8 16h8" />
			<path d="M12 20v-4" />
		</svg>
	);

	const CreditCardIcon = () => (
		<svg
			width="48"
			height="48"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
			<line x1="1" y1="10" x2="23" y2="10" />
		</svg>
	);

	const DocumentIcon = () => (
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

	const SearchIcon = () => (
		<svg
			width="48"
			height="48"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.35-4.35" />
		</svg>
	);

	const EditIcon = () => (
		<svg
			width="48"
			height="48"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
			<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
		</svg>
	);

	const MoneyBagIcon = () => (
		<svg
			width="48"
			height="48"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M7 12c0 2.5 2 4.5 5 4.5s5-2 5-4.5" />
			<path d="M12 7.5c3.5 0 6.5 1.5 6.5 3.5S15.5 14.5 12 14.5 5.5 12.5 5.5 10.5 8.5 7.5 12 7.5z" />
			<path d="M12 2v3" />
			<path d="M12 19v3" />
		</svg>
	);

	const MagnifyingGlassIcon = () => (
		<svg
			width="48"
			height="48"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.35-4.35" />
			<circle cx="11" cy="11" r="3" />
		</svg>
	);

	const ChartIcon = () => (
		<svg
			width="48"
			height="48"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M3 3v18h18" />
			<path d="m19 9-5 5-4-4-3 3" />
		</svg>
	);

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

	const SearchIconSmall = () => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.35-4.35" />
		</svg>
	);

	const services = [
		{
			id: 1,
			icon: CreditCardIcon,
			title: "Solicitud de Tarjeta",
			description: "Proceso para solicitar tarjetas de credito y debito",
			gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
			category: "Productos",
			pdfName: "Solicitud de Tarjeta.pdf",
		},
		{
			id: 2,
			icon: DocumentIcon,
			title: "Pago de Servicios",
			description: "Instrucciones para pagos de servicios publicos",
			gradient: "linear-gradient(135deg, #10b981, #059669)",
			category: "Pagos",
			pdfName: "Pago de Servicios.pdf",
		},
		{
			id: 3,
			icon: SearchIcon,
			title: "Consulta de Saldos y Movimientos",
			description: "Como consultar balances y transacciones",
			gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
			category: "Consultas",
			pdfName: "Consulta de Saldos y Movimientos.pdf",
		},
		{
			id: 4,
			icon: EditIcon,
			title: "Gestion de Chequeras",
			description: "Solicitud y manejo de talonarios de cheques",
			gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
			category: "Chequeras",
			pdfName: "Gestion de Chequeras.pdf",
		},
		{
			id: 5,
			icon: MoneyBagIcon,
			title: "Solicitud de Prestamos",
			description: "Procedimiento para solicitar creditos",
			gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
			category: "Prestamos",
			pdfName: "Solicitud de Prestamos.pdf",
		},
		{
			id: 6,
			icon: MagnifyingGlassIcon,
			title: "Seguimiento de Prestamos",
			description: "Monitoreo del estado de solicitudes de credito",
			gradient: "linear-gradient(135deg, #84cc16, #65a30d)",
			category: "Seguimiento",
			pdfName: "Seguimiento de Prestamos.pdf",
		},
		{
			id: 7,
			icon: PiggyBankIcon,
			title: "Manual de apertura de cuenta",
			description: "Guia completa para abrir nuevas cuentas bancarias",
			gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
			category: "Cuentas",
			pdfName: "Manual de apertura de cuenta ejemplo.pdf",
		},
		{
			id: 8,
			icon: ChartIcon,
			title: "Manual de inversion a plazo fijo",
			description: "Proceso para realizar inversiones a plazo fijo",
			gradient: "linear-gradient(135deg, #f97316, #ea580c)",
			category: "Inversiones",
			pdfName: "Manual de inversion a plazo fijo.pdf",
		},
	];

	const filteredServices = services.filter(
		(service) =>
			service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			service.category.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const keyframes = `
		@keyframes fadeInUp {
			from { opacity: 0; transform: translateY(30px); }
			to { opacity: 1; transform: translateY(0); }
		}
		@keyframes slideInUp {
			from { opacity: 0; transform: translateY(20px); }
			to { opacity: 1; transform: translateY(0); }
		}
		@keyframes float {
			0%, 100% { transform: translateY(0px) rotate(0deg); }
			50% { transform: translateY(-20px) rotate(3deg); }
		}
		@keyframes floatReverse {
			0%, 100% { transform: translateY(0px) rotate(0deg); }
			50% { transform: translateY(-15px) rotate(-3deg); }
		}
	`;

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "#f9fafb",
				fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
			}}
		>
			<style>{keyframes}</style>

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
							style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937" }}
						>
							Bam
						</span>
					</div>
					<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
						<div
							style={{
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
							}}
						>
							A
						</div>
						<span style={{ color: "#6b7280" }}>Adriana</span>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section
				style={{
					background: "white",
					position: "relative",
					overflow: "hidden",
					padding: "80px 24px 60px 24px",
					boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
				}}
			>
				{/* Líneas decorativas arriba izquierda */}
				<div
					style={{
						position: "absolute",
						top: "40px",
						left: "6%",
						width: "220px",
						height: "10px",
						background: "linear-gradient(90deg, #FFD700 0%, #FFA500 100%)",
						borderRadius: "20px",
						transform: "rotate(-8deg)",
						animation: "float 6s ease-in-out infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "70px",
						left: "4%",
						width: "180px",
						height: "8px",
						background: "linear-gradient(90deg, #00D4FF 0%, #0099FF 100%)",
						borderRadius: "20px",
						transform: "rotate(-10deg)",
						animation: "float 7s ease-in-out infinite 0.5s",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "105px",
						left: "8%",
						width: "140px",
						height: "7px",
						background: "linear-gradient(90deg, #B794F6 0%, #9F7AEA 100%)",
						borderRadius: "20px",
						transform: "rotate(-6deg)",
						animation: "float 8s ease-in-out infinite 1s",
					}}
				></div>

				{/* Líneas decorativas abajo derecha */}
				<div
					style={{
						position: "absolute",
						bottom: "50px",
						right: "6%",
						width: "200px",
						height: "10px",
						background: "linear-gradient(90deg, #FF6B9D 0%, #FE5196 100%)",
						borderRadius: "20px",
						transform: "rotate(10deg)",
						animation: "floatReverse 6s ease-in-out infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						bottom: "80px",
						right: "8%",
						width: "160px",
						height: "8px",
						background: "linear-gradient(90deg, #4ECDC4 0%, #44A08D 100%)",
						borderRadius: "20px",
						transform: "rotate(8deg)",
						animation: "floatReverse 7s ease-in-out infinite 0.5s",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						bottom: "115px",
						right: "4%",
						width: "140px",
						height: "7px",
						background: "linear-gradient(90deg, #F6D365 0%, #FDA085 100%)",
						borderRadius: "20px",
						transform: "rotate(12deg)",
						animation: "floatReverse 8s ease-in-out infinite 1s",
					}}
				></div>

				{/* Círculos decorativos */}
				<div
					style={{
						position: "absolute",
						top: "45%",
						left: "2%",
						width: "100px",
						height: "100px",
						background: "rgba(251, 191, 36, 0.05)",
						borderRadius: "50%",
						animation: "float 10s ease-in-out infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "35%",
						right: "3%",
						width: "90px",
						height: "90px",
						background: "rgba(59, 130, 246, 0.05)",
						borderRadius: "50%",
						animation: "floatReverse 9s ease-in-out infinite",
					}}
				></div>

				<div
					style={{
						maxWidth: "1200px",
						margin: "0 auto",
						position: "relative",
						zIndex: 10,
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
						onClick={() => (window.location.href = "/")}
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
						Volver a Bam Conecta 360
					</button>

					<h1
						style={{
							fontSize: "56px",
							fontWeight: "800",
							color: "#1f2937",
							marginBottom: "16px",
							letterSpacing: "-0.02em",
							animation: isVisible ? "fadeInUp 1s ease-out" : "none",
						}}
					>
						Guías y{" "}
						<span
							style={{
								background:
									"linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								backgroundClip: "text",
							}}
						>
							Procedimientos
						</span>
					</h1>

					<p
						style={{
							fontSize: "20px",
							color: "#4b5563",
							marginBottom: "40px",
							maxWidth: "700px",
							lineHeight: "1.6",
							animation: isVisible ? "fadeInUp 1s ease-out 0.2s both" : "none",
						}}
					>
						Encuentra el material de procedimientos guiados Bam, realiza tus
						gestiones paso a paso
					</p>

					<div
						style={{
							position: "relative",
							maxWidth: "600px",
							animation: isVisible ? "fadeInUp 1s ease-out 0.4s both" : "none",
						}}
					>
						<input
							type="text"
							placeholder="Escribe tu consulta aquí"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							style={{
								width: "100%",
								padding: "18px 60px 18px 24px",
								fontSize: "16px",
								border: searchTerm ? "2px solid #fbbf24" : "2px solid #e5e7eb",
								borderRadius: "50px",
								background: "white",
								outline: "none",
								transition: "all 0.3s ease",
								boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
							}}
						/>
						<button
							style={{
								position: "absolute",
								right: "8px",
								top: "50%",
								transform: "translateY(-50%)",
								background: "linear-gradient(135deg, #1f2937, #374151)",
								color: "white",
								border: "none",
								borderRadius: "50px",
								width: "44px",
								height: "44px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
								transition: "all 0.3s ease",
							}}
							onMouseEnter={(e) =>
								(e.target.style.transform = "translateY(-50%) scale(1.1)")
							}
							onMouseLeave={(e) =>
								(e.target.style.transform = "translateY(-50%) scale(1)")
							}
						>
							<SearchIconSmall />
						</button>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section
				style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}
			>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
						gap: "24px",
					}}
				>
					{filteredServices.map((service, index) => {
						const IconComponent = service.icon;
						const animationDelay = `${index * 0.1}s`;

						return (
							<div
								key={service.id}
								style={{
									background: "white",
									borderRadius: "20px",
									padding: "32px 24px",
									boxShadow:
										hoveredCard === service.id
											? "0 20px 50px rgba(0, 0, 0, 0.15)"
											: "0 8px 30px rgba(0, 0, 0, 0.08)",
									transition: "all 0.4s ease",
									cursor: "pointer",
									position: "relative",
									overflow: "hidden",
									border:
										hoveredCard === service.id
											? "2px solid #fbbf24"
											: "2px solid transparent",
									textAlign: "center",
									transform:
										hoveredCard === service.id
											? "translateY(-8px) scale(1.02)"
											: "translateY(0) scale(1)",
									animation: `slideInUp 0.6s ease-out ${animationDelay} both`,
								}}
								onMouseEnter={() => setHoveredCard(service.id)}
								onMouseLeave={() => setHoveredCard(null)}
								onClick={() => {
									// Navegar al visor de PDF con el nombre del archivo
									window.location.href = `/pdf-viewer?filename=${encodeURIComponent(
										service.pdfName
									)}`;
								}}
							>
								<div
									style={{
										width: "80px",
										height: "80px",
										borderRadius: "20px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										margin: "0 auto 20px auto",
										color: "white",
										background: service.gradient,
										transform:
											hoveredCard === service.id
												? "scale(1.1) rotate(5deg)"
												: "scale(1) rotate(0deg)",
										transition: "all 0.4s ease",
									}}
								>
									<IconComponent />
								</div>

								<h3
									style={{
										fontSize: "20px",
										fontWeight: "700",
										color: hoveredCard === service.id ? "#f59e0b" : "#1f2937",
										marginBottom: "12px",
										transition: "color 0.3s ease",
									}}
								>
									{service.title}
								</h3>

								<p
									style={{
										color: "#6b7280",
										fontSize: "14px",
										lineHeight: "1.5",
										marginBottom: "20px",
									}}
								>
									{service.description}
								</p>

								<div
									style={{
										display: "inline-block",
										background: "linear-gradient(135deg, #e5e7eb, #f3f4f6)",
										color: "#6b7280",
										padding: "6px 16px",
										borderRadius: "20px",
										fontSize: "12px",
										fontWeight: "600",
										textTransform: "uppercase",
										letterSpacing: "0.5px",
									}}
								>
									{service.category}
								</div>

								<div
									style={{
										position: "absolute",
										top: "-50px",
										right: "-50px",
										width: "100px",
										height: "100px",
										background:
											"linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(249, 115, 22, 0.1))",
										borderRadius: "50%",
										opacity: hoveredCard === service.id ? 1 : 0,
										transform:
											hoveredCard === service.id ? "scale(1)" : "scale(0)",
										transition: "all 0.4s ease",
									}}
								></div>
							</div>
						);
					})}
				</div>

				{filteredServices.length === 0 && searchTerm && (
					<div
						style={{ textAlign: "center", padding: "60px 0", color: "#6b7280" }}
					>
						<div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
						<h3
							style={{
								fontSize: "24px",
								fontWeight: "700",
								marginBottom: "8px",
								color: "#1f2937",
							}}
						>
							No se encontraron resultados
						</h3>
						<p>Intenta con otros términos de búsqueda</p>
					</div>
				)}
			</section>
		</div>
	);
}
