import React, { useState, useEffect } from "react";
import logoImpresion from "../assets/logo-impresion.png";

export default function BamConecta360() {
	const [hoveredCard, setHoveredCard] = useState(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

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
			gradient: "linear-gradient(135deg, #7AC9E8, #1d4ed8)",
		},
		{
			id: 2,
			icon: HeadphonesIcon,
			title: "Soporte interno",
			description:
				"Asistencia técnica especializada disponible las 24 horas del día para resolver tus dudas.",
			gradient: "linear-gradient(135deg, #8567C7, #7c3aed)",
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

	const keyframes = `
		@keyframes fadeInUp {
			from { opacity: 0; transform: translateY(30px); }
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
					padding: "120px 24px 80px 24px",
					textAlign: "center",
					boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
				}}
			>
				{/* Líneas decorativas arriba izquierda */}
				<div
					style={{
						position: "absolute",
						top: "60px",
						left: "8%",
						width: "280px",
						height: "12px",
						background: "linear-gradient(90deg, #FFD700 0%, #FFA500 100%)",
						borderRadius: "20px",
						transform: "rotate(-8deg)",
						animation: "float 6s ease-in-out infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "95px",
						left: "6%",
						width: "220px",
						height: "10px",
						background: "linear-gradient(90deg, #00D4FF 0%, #0099FF 100%)",
						borderRadius: "20px",
						transform: "rotate(-10deg)",
						animation: "float 7s ease-in-out infinite 0.5s",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "135px",
						left: "10%",
						width: "160px",
						height: "8px",
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
						bottom: "80px",
						right: "8%",
						width: "260px",
						height: "12px",
						background: "linear-gradient(90deg, #FF6B9D 0%, #FE5196 100%)",
						borderRadius: "20px",
						transform: "rotate(10deg)",
						animation: "floatReverse 6s ease-in-out infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						bottom: "115px",
						right: "10%",
						width: "200px",
						height: "10px",
						background: "linear-gradient(90deg, #4ECDC4 0%, #44A08D 100%)",
						borderRadius: "20px",
						transform: "rotate(8deg)",
						animation: "floatReverse 7s ease-in-out infinite 0.5s",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						bottom: "155px",
						right: "6%",
						width: "180px",
						height: "8px",
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
						top: "50%",
						left: "3%",
						width: "120px",
						height: "120px",
						background: "rgba(124, 58, 237, 0.05)",
						borderRadius: "50%",
						animation: "float 10s ease-in-out infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "40%",
						right: "5%",
						width: "100px",
						height: "100px",
						background: "rgba(249, 115, 22, 0.05)",
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
					<div
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "8px",
							background: "#FFF8E1",
							border: "1px solid #FFD54F",
							borderRadius: "50px",
							padding: "8px 20px",
							marginBottom: "32px",
							color: "#F57C00",
							fontWeight: "600",
							fontSize: "14px",
							animation: isVisible ? "fadeInUp 1s ease-out" : "none",
						}}
					>
						<SparklesIcon />
						<span>Nueva experiencia mejorada</span>
					</div>

					<h1
						style={{
							fontSize: "72px",
							fontWeight: "800",
							color: "#1f2937",
							marginBottom: "24px",
							letterSpacing: "-0.03em",
							lineHeight: "1.1",
							animation: isVisible ? "fadeInUp 1s ease-out 0.2s both" : "none",
						}}
					>
						Bam Conecta{" "}
						<span
							style={{
								background:
									"linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FDC830 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								backgroundClip: "text",
							}}
						>
							360
						</span>
					</h1>

					<p
						style={{
							fontSize: "22px",
							color: "#4b5563",
							marginBottom: "40px",
							maxWidth: "700px",
							margin: "0 auto 40px auto",
							lineHeight: "1.6",
							animation: isVisible ? "fadeInUp 1s ease-out 0.4s both" : "none",
						}}
					>
						¿Necesitas ayuda? Tu centro de recursos todo en uno para una
						experiencia perfecta
					</p>
				</div>
			</section>

			{/* Services Section */}
			<section
				style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}
			>
				<div style={{ textAlign: "center", marginBottom: "64px" }}>
					<h2
						style={{
							fontSize: "36px",
							fontWeight: "700",
							color: "#1f2937",
							marginBottom: "16px",
						}}
					>
						Consulta de procesos y políticas
					</h2>
					<p
						style={{
							fontSize: "18px",
							color: "#6b7280",
							maxWidth: "800px",
							margin: "0 auto",
							lineHeight: "1.7",
						}}
					>
						Encuentra todos los recursos en un solo lugar. Recuerda que siempre
						puedes acercarte a tus compañeros o supervisores para resolver
						consultas, si necesitas algo, ¡comunícalo!
					</p>
				</div>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
						gap: "32px",
						marginBottom: "64px",
					}}
				>
					{services.map((service) => {
						const IconComponent = service.icon;
						return (
							<div
								key={service.id}
								style={{
									background: "white",
									borderRadius: "16px",
									padding: "32px",
									boxShadow:
										hoveredCard === service.id
											? "0 20px 40px rgba(0, 0, 0, 0.15)"
											: "0 10px 25px rgba(0, 0, 0, 0.1)",
									transition: "all 0.5s ease",
									cursor: "pointer",
									border: "1px solid #f3f4f6",
									transform:
										hoveredCard === service.id
											? "translateY(-8px) scale(1.02)"
											: "translateY(0) scale(1)",
								}}
								onMouseEnter={() => setHoveredCard(service.id)}
								onMouseLeave={() => setHoveredCard(null)}
								onClick={() => {
									if (service.id === 1) {
										window.location.href = "/guias";
									}
									if (service.id === 2) {
										window.location.href = "/soporte";
									}
									if (service.id === 3) {
										window.location.href = "/chatbot";
									}
								}}
							>
								<div
									style={{
										width: "64px",
										height: "64px",
										borderRadius: "12px",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										marginBottom: "24px",
										color: "white",
										background: service.gradient,
										transform:
											hoveredCard === service.id
												? "rotate(6deg) scale(1.05)"
												: "rotate(0deg) scale(1)",
										transition: "transform 0.3s ease",
									}}
								>
									<IconComponent />
								</div>

								<h3
									style={{
										fontSize: "24px",
										fontWeight: "700",
										color: hoveredCard === service.id ? "#3b82f6" : "#1f2937",
										marginBottom: "16px",
										transition: "color 0.3s ease",
									}}
								>
									{service.title}
								</h3>

								<p
									style={{
										color: "#6b7280",
										marginBottom: "24px",
										lineHeight: "1.6",
									}}
								>
									{service.description}
								</p>

								<div
									style={{
										display: "flex",
										alignItems: "center",
										color: "#3b82f6",
										fontWeight: "600",
										gap: "8px",
									}}
								>
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
							display: "inline-flex",
							alignItems: "center",
							gap: "12px",
							background: "linear-gradient(135deg, #7AC9E8, #8567C7)",
							color: "white",
							padding: "16px 32px",
							borderRadius: "50px",
							fontWeight: "600",
							fontSize: "18px",
							boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
							border: "none",
							cursor: "pointer",
							transition: "all 0.3s ease",
						}}
						onMouseEnter={(e) => {
							e.target.style.transform = "scale(1.05)";
							e.target.style.boxShadow = "0 15px 35px rgba(59, 130, 246, 0.4)";
						}}
						onMouseLeave={(e) => {
							e.target.style.transform = "scale(1)";
							e.target.style.boxShadow = "0 10px 25px rgba(59, 130, 246, 0.3)";
						}}
					>
						<MessageIcon />
						<span>¿Necesitas ayuda adicional?</span>
						<ChevronRightIcon />
					</button>
				</div>
			</section>

			{/* Footer */}
			<footer
				style={{
					background: "#1f2937",
					color: "white",
					padding: "48px 24px",
					textAlign: "center",
					marginTop: "80px",
				}}
			>
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
						<img
							src={logoImpresion}
							alt="Bam Logo"
							style={{
								width: "32px",
								height: "32px",
								borderRadius: "6px",
							}}
						/>
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
