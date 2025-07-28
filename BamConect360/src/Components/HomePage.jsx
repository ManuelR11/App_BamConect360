import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importa esto

export default function BamConecta360() {
	const [hoveredCard, setHoveredCard] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const navigate = useNavigate(); // 👈 Inicializa navegación

	useEffect(() => {
		setIsVisible(true);
	}, []);

	// Iconos como componentes SVG simples
	const FileIcon = () => (
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
			<polyline points="14,2 14,8 20,8" />
			<line x1="16" y1="13" x2="8" y2="13" />
			<line x1="16" y1="17" x2="8" y2="17" />
			<line x1="10" y1="9" x2="8" y2="9" />
		</svg>
	);

	const HeadphonesIcon = () => (
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M3 14v5a2 2 0 0 0 2 2h2v-7H3z" />
			<path d="M21 14v5a2 2 0 0 0-2 2h-2v-7h4z" />
			<path d="M7 14a7 7 0 1 1 10 0" />
		</svg>
	);

	const MessageIcon = () => (
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
		</svg>
	);

	const SparklesIcon = () => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M12 3l1.09 3.26L16 7.64l-2.91 1.38L12 12l-1.09-3.26L8 7.64l2.91-1.38L12 3z" />
			<path d="M5 3l0.7 2.1L8 5.8l-2.3 1.1L5 9l-0.7-2.1L2 5.8l2.3-1.1L5 3z" />
		</svg>
	);

	const ChevronRightIcon = () => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<polyline points="9,18 15,12 9,6" />
		</svg>
	);

	const services = [
		{
			id: 1,
			icon: FileIcon,
			title: "Guías y procedimientos",
			description:
				"Accede a documentación completa y actualizada para todos tus procesos de trabajo.",
			gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
		},
		{
			id: 2,
			icon: HeadphonesIcon,
			title: "Soporte interno",
			description:
				"Asistencia técnica especializada disponible las 24 horas del día para resolver tus dudas.",
			gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
		},
		{
			id: 3,
			icon: MessageIcon,
			title: "Chatbot interno",
			description:
				"Obtén respuestas instantáneas a tus preguntas con nuestro asistente inteligente.",
			gradient: "linear-gradient(135deg, #14b8a6, #0d9488)",
		},
	];

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
			background: "linear-gradient(135deg, #fbbf24, #f97316, #ef4444)",
			position: "relative",
			overflow: "hidden",
			padding: "96px 24px",
			textAlign: "center",
		},
		heroContent: {
			maxWidth: "1200px",
			margin: "0 auto",
			position: "relative",
			zIndex: 10,
		},
		heroBadge: {
			display: "inline-flex",
			alignItems: "center",
			gap: "8px",
			background: "rgba(255, 255, 255, 0.2)",
			backdropFilter: "blur(10px)",
			borderRadius: "50px",
			padding: "8px 16px",
			marginBottom: "32px",
			color: "white",
			fontWeight: "500",
			animation: isVisible ? "fadeInUp 1s ease-out" : "none",
		},
		heroTitle: {
			fontSize: "64px",
			fontWeight: "700",
			color: "white",
			marginBottom: "24px",
			letterSpacing: "-0.02em",
			animation: isVisible ? "fadeInUp 1s ease-out 0.2s both" : "none",
		},
		heroSubtitle: {
			fontSize: "20px",
			color: "rgba(255, 255, 255, 0.9)",
			marginBottom: "32px",
			maxWidth: "600px",
			margin: "0 auto 32px auto",
			animation: isVisible ? "fadeInUp 1s ease-out 0.4s both" : "none",
		},
		servicesSection: {
			padding: "80px 24px",
			maxWidth: "1200px",
			margin: "0 auto",
		},
		servicesHeader: {
			textAlign: "center",
			marginBottom: "64px",
		},
		servicesTitle: {
			fontSize: "36px",
			fontWeight: "700",
			color: "#1f2937",
			marginBottom: "16px",
		},
		servicesDescription: {
			fontSize: "18px",
			color: "#6b7280",
			maxWidth: "800px",
			margin: "0 auto",
			lineHeight: "1.7",
		},
		servicesGrid: {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
			gap: "32px",
			marginBottom: "64px",
		},
		serviceCard: {
			background: "white",
			borderRadius: "16px",
			padding: "32px",
			boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
			transition: "all 0.5s ease",
			cursor: "pointer",
			position: "relative",
			overflow: "hidden",
			transform:
				hoveredCard === 1
					? "translateY(-8px)"
					: hoveredCard === 2
					? "translateY(-8px)"
					: hoveredCard === 3
					? "translateY(-8px)"
					: "translateY(0)",
		},
		serviceIcon: {
			width: "64px",
			height: "64px",
			borderRadius: "12px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			marginBottom: "24px",
			color: "white",
			transition: "transform 0.3s ease",
		},
		serviceTitle: {
			fontSize: "24px",
			fontWeight: "700",
			color: "#1f2937",
			marginBottom: "16px",
		},
		serviceDescription: {
			color: "#6b7280",
			marginBottom: "24px",
			lineHeight: "1.6",
		},
		serviceLink: {
			display: "flex",
			alignItems: "center",
			color: "#3b82f6",
			fontWeight: "600",
			textDecoration: "none",
			gap: "8px",
		},
		ctaButton: {
			display: "inline-flex",
			alignItems: "center",
			gap: "12px",
			background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
			color: "white",
			padding: "16px 32px",
			borderRadius: "50px",
			fontWeight: "600",
			fontSize: "18px",
			textDecoration: "none",
			transition: "all 0.3s ease",
			boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
			border: "none",
			cursor: "pointer",
		},
		footer: {
			background: "#1f2937",
			color: "white",
			padding: "48px 24px",
			textAlign: "center",
			marginTop: "80px",
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
    @keyframes pulse {
      0%, 100% {
        opacity: 0.6;
        transform: scale(1);
      }
      50% {
        opacity: 1;
        transform: scale(1.1);
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
				{/* Elementos flotantes */}
				<div
					style={{
						position: "absolute",
						top: "80px",
						left: "40px",
						width: "80px",
						height: "80px",
						background: "rgba(255, 255, 255, 0.2)",
						borderRadius: "50%",
						animation: "pulse 2s infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "160px",
						right: "80px",
						width: "64px",
						height: "64px",
						background: "rgba(255, 255, 255, 0.2)",
						borderRadius: "50%",
						animation: "pulse 2s infinite 1s",
					}}
				></div>

				<div style={baseStyles.heroContent}>
					<div style={baseStyles.heroBadge}>
						<SparklesIcon />
						<span>Nueva experiencia mejorada</span>
					</div>

					<h1 style={baseStyles.heroTitle}>
						Bam Conecta{" "}
						<span
							style={{
								background: "linear-gradient(135deg, #ffffff, #fef3c7)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								backgroundClip: "text",
							}}
						>
							360
						</span>
					</h1>

					<p style={baseStyles.heroSubtitle}>
						¿Necesitas ayuda? Tu centro de recursos todo en uno para una
						experiencia perfecta
					</p>
				</div>
			</section>

			{/* Services Section */}
			<section style={baseStyles.servicesSection}>
				<div style={baseStyles.servicesHeader}>
					<h2 style={baseStyles.servicesTitle}>
						Consulta de procesos y políticas
					</h2>
					<p style={baseStyles.servicesDescription}>
						Encuentra todos los recursos en un solo lugar. Recuerda que siempre
						puedes acercarte a tus compañeros o supervisores para resolver
						consultas, si necesitas algo, ¡comunícalo!
					</p>
				</div>

				<div style={baseStyles.servicesGrid}>
					{services.map((service, index) => {
						const IconComponent = service.icon;
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
											? "0 20px 40px rgba(0, 0, 0, 0.15)"
											: "0 10px 25px rgba(0, 0, 0, 0.1)",
								}}
								onMouseEnter={() => setHoveredCard(service.id)}
								onMouseLeave={() => setHoveredCard(null)}
								onClick={() => {
									if (service.id === 1) {
										navigate("/guias"); // 👈 Redirección personalizada
									}
									if (service.id === 2) {
										//navigate("/soporte");
									}
									if (service.id === 3) {
										navigate("/chatbot");
									}
								}}
							>
								<div
									style={{
										...baseStyles.serviceIcon,
										background: service.gradient,
										transform:
											hoveredCard === service.id
												? "rotate(6deg)"
												: "rotate(0deg)",
									}}
								>
									<IconComponent />
								</div>

								<h3
									style={{
										...baseStyles.serviceTitle,
										color: hoveredCard === service.id ? "#3b82f6" : "#1f2937",
									}}
								>
									{service.title}
								</h3>

								<p style={baseStyles.serviceDescription}>
									{service.description}
								</p>

								<div style={baseStyles.serviceLink}>
									<span>Explorar ahora</span>
									<ChevronRightIcon />
								</div>
							</div>
						);
					})}
				</div>

				{/* Call to action */}
				<div style={{ textAlign: "center" }}>
					<button
						style={{
							...baseStyles.ctaButton,
							transform: "scale(1)",
							":hover": {
								transform: "scale(1.05)",
							},
						}}
						onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
						onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
					>
						<MessageIcon />
						<span>¿Necesitas ayuda adicional?</span>
						<ChevronRightIcon />
					</button>
				</div>
			</section>

			{/* Footer */}
			<footer style={baseStyles.footer}>
				<div style={{ maxWidth: "1200px", margin: "0 auto" }}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "12px",
							marginBottom: "16px",
						}}
					>
						<div
							style={{
								width: "32px",
								height: "32px",
								background: "linear-gradient(135deg, #fbbf24, #f97316)",
								borderRadius: "6px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								position: "relative",
							}}
						>
							<div
								style={{
									width: "16px",
									height: "16px",
									background: "white",
									borderRadius: "2px",
									opacity: 0.9,
								}}
							></div>
						</div>
						<span style={{ fontSize: "20px", fontWeight: "700" }}>
							Bam Conecta 360
						</span>
					</div>
					<p style={{ color: "#9ca3af" }}>
						Tu plataforma integral para soporte y recursos empresariales
					</p>
				</div>
			</footer>
		</div>
	);
}
