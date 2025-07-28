import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GuiasProcedimientos() {
	const [hoveredCard, setHoveredCard] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsVisible(true);
	}, []);

	// Iconos como componentes SVG
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
			icon: PiggyBankIcon,
			title: "Apertura de cuenta",
			description: "Guía completa para abrir nuevas cuentas bancarias",
			gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
			category: "Cuentas",
		},
		{
			id: 2,
			icon: CreditCardIcon,
			title: "Solicitud de tarjetas",
			description: "Proceso para solicitar tarjetas de crédito y débito",
			gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
			category: "Productos",
		},
		{
			id: 3,
			icon: DocumentIcon,
			title: "Pago de servicios",
			description: "Instrucciones para pagos de servicios públicos",
			gradient: "linear-gradient(135deg, #10b981, #059669)",
			category: "Pagos",
		},
		{
			id: 4,
			icon: SearchIcon,
			title: "Consulta de saldos y movimientos",
			description: "Cómo consultar balances y transacciones",
			gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
			category: "Consultas",
		},
		{
			id: 5,
			icon: EditIcon,
			title: "Gestión de chequeras",
			description: "Solicitud y manejo de talonarios de cheques",
			gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
			category: "Chequeras",
		},
		{
			id: 6,
			icon: MoneyBagIcon,
			title: "Solicitud de préstamos",
			description: "Procedimiento para solicitar créditos",
			gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
			category: "Préstamos",
		},
		{
			id: 7,
			icon: MagnifyingGlassIcon,
			title: "Seguimiento de préstamos",
			description: "Monitoreo del estado de solicitudes de crédito",
			gradient: "linear-gradient(135deg, #84cc16, #65a30d)",
			category: "Seguimiento",
		},
		{
			id: 8,
			icon: ChartIcon,
			title: "Solicitud de refinanciamiento",
			description: "Proceso para refinanciar préstamos existentes",
			gradient: "linear-gradient(135deg, #f97316, #ea580c)",
			category: "Refinanciamiento",
		},
	];

	const filteredServices = services.filter(
		(service) =>
			service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			service.category.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const baseStyles = {
		container: {
			minHeight: "100vh",
			background:
				"linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%)",
			fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
		},
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
		hero: {
			background: "linear-gradient(135deg, #fbbf24, #f97316)",
			position: "relative",
			overflow: "hidden",
			padding: "80px 24px",
			textAlign: "center",
		},
		heroContent: {
			maxWidth: "1200px",
			margin: "0 auto",
			position: "relative",
			zIndex: 10,
		},
		heroTitle: {
			fontSize: "48px",
			fontWeight: "700",
			color: "#1f2937",
			marginBottom: "16px",
			letterSpacing: "-0.02em",
			animation: isVisible ? "fadeInUp 1s ease-out" : "none",
		},
		heroSubtitle: {
			fontSize: "18px",
			color: "#4b5563",
			marginBottom: "40px",
			maxWidth: "700px",
			margin: "0 auto 40px auto",
			animation: isVisible ? "fadeInUp 1s ease-out 0.2s both" : "none",
		},
		searchContainer: {
			position: "relative",
			maxWidth: "600px",
			margin: "0 auto",
			animation: isVisible ? "fadeInUp 1s ease-out 0.4s both" : "none",
		},
		searchInput: {
			width: "100%",
			padding: "18px 60px 18px 24px",
			fontSize: "16px",
			border: "2px solid rgba(255, 255, 255, 0.3)",
			borderRadius: "50px",
			background: "rgba(255, 255, 255, 0.9)",
			backdropFilter: "blur(10px)",
			outline: "none",
			transition: "all 0.3s ease",
			boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
		},
		searchButton: {
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
			marginBottom: "32px",
			boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
			alignSelf: "flex-start",
		},
		servicesSection: {
			padding: "60px 24px",
			maxWidth: "1200px",
			margin: "0 auto",
		},
		servicesGrid: {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
			gap: "24px",
		},
		serviceCard: {
			background: "white",
			borderRadius: "20px",
			padding: "32px 24px",
			boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
			transition: "all 0.4s ease",
			cursor: "pointer",
			position: "relative",
			overflow: "hidden",
			border: "2px solid transparent",
			textAlign: "center",
		},
		serviceIcon: {
			width: "80px",
			height: "80px",
			borderRadius: "20px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			margin: "0 auto 20px auto",
			color: "white",
			transition: "all 0.4s ease",
		},
		serviceTitle: {
			fontSize: "20px",
			fontWeight: "700",
			color: "#1f2937",
			marginBottom: "12px",
			transition: "color 0.3s ease",
		},
		serviceDescription: {
			color: "#6b7280",
			fontSize: "14px",
			lineHeight: "1.5",
			marginBottom: "20px",
		},
		serviceCategory: {
			display: "inline-block",
			background: "linear-gradient(135deg, #e5e7eb, #f3f4f6)",
			color: "#6b7280",
			padding: "6px 16px",
			borderRadius: "20px",
			fontSize: "12px",
			fontWeight: "600",
			textTransform: "uppercase",
			letterSpacing: "0.5px",
		},
	};

	// Agregar keyframes CSS
	const keyframes = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

	return (
		<div style={baseStyles.container}>
			<style>{keyframes}</style>

			{/* Header */}
			<header style={baseStyles.header}>
				<div style={baseStyles.headerContent}>
					<div style={baseStyles.logo}>
						<div style={baseStyles.logoIcon}>
							<div style={baseStyles.logoIconInner}></div>
						</div>
						<span style={baseStyles.logoText}>Bam</span>
					</div>
					<div style={baseStyles.userInfo}>
						<div style={baseStyles.userAvatar}>MH</div>
						<span style={{ color: "#6b7280" }}>Marta H.</span>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section style={baseStyles.hero}>
				<div style={baseStyles.heroContent}>
					<button
						style={{
							...baseStyles.backButton,
							transform: "scale(1)",
						}}
						onClick={() => navigate("/")} // 👈 Redirige al home
						onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
						onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
					>
						<BackIcon />
						Volver a Bam Conecta 360
					</button>

					<h1 style={baseStyles.heroTitle}>Guías y Procedimientos</h1>

					<p style={baseStyles.heroSubtitle}>
						Encuentra el material de procedimientos guiados Bam, realiza tus
						gestiones paso a paso
					</p>

					<div style={baseStyles.searchContainer}>
						<input
							type="text"
							placeholder="Escribe tu consulta aquí"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							style={{
								...baseStyles.searchInput,
								border: searchTerm
									? "2px solid #fbbf24"
									: "2px solid rgba(255, 255, 255, 0.3)",
							}}
						/>
						<button
							style={{
								...baseStyles.searchButton,
								transform: "scale(1)",
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
			<section style={baseStyles.servicesSection}>
				<div style={baseStyles.servicesGrid}>
					{filteredServices.map((service, index) => {
						const IconComponent = service.icon;
						const animationDelay = `${index * 0.1}s`;

						return (
							<div
								key={service.id}
								style={{
									...baseStyles.serviceCard,
									transform:
										hoveredCard === service.id
											? "translateY(-8px) scale(1.02)"
											: "translateY(0) scale(1)",
									boxShadow:
										hoveredCard === service.id
											? "0 20px 50px rgba(0, 0, 0, 0.15)"
											: "0 8px 30px rgba(0, 0, 0, 0.08)",
									border:
										hoveredCard === service.id
											? "2px solid #fbbf24"
											: "2px solid transparent",
									animation: `slideInUp 0.6s ease-out ${animationDelay} both`,
								}}
								onMouseEnter={() => setHoveredCard(service.id)}
								onMouseLeave={() => setHoveredCard(null)}
							>
								<div
									style={{
										...baseStyles.serviceIcon,
										background: service.gradient,
										transform:
											hoveredCard === service.id
												? "scale(1.1) rotate(5deg)"
												: "scale(1) rotate(0deg)",
									}}
								>
									<IconComponent />
								</div>

								<h3
									style={{
										...baseStyles.serviceTitle,
										color: hoveredCard === service.id ? "#f59e0b" : "#1f2937",
									}}
								>
									{service.title}
								</h3>

								<p style={baseStyles.serviceDescription}>
									{service.description}
								</p>

								<div style={baseStyles.serviceCategory}>{service.category}</div>

								{/* Efectos decorativos */}
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
						style={{
							textAlign: "center",
							padding: "60px 0",
							color: "#6b7280",
						}}
					>
						<div
							style={{
								fontSize: "48px",
								marginBottom: "16px",
							}}
						>
							🔍
						</div>
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
