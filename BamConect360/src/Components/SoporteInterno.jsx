import React, { useState, useEffect } from "react";

export default function BamSoporteInterno() {
	const [isVisible, setIsVisible] = useState(false);
	const [hoveredCard, setHoveredCard] = useState(null);
	const [activeTab, setActiveTab] = useState("phone");

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const ArrowLeftIcon = () => (
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

	const PhoneIcon = () => (
		<svg
			width="32"
			height="32"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
		</svg>
	);

	const MessageCircleIcon = () => (
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

	const ClockIcon = () => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<circle cx="12" cy="12" r="10" />
			<polyline points="12,6 12,12 16,14" />
		</svg>
	);

	const UsersIcon = () => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
			<path d="M16 3.13a4 4 0 0 1 0 7.75" />
		</svg>
	);

	const CheckCircleIcon = () => (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M9 11l3 3 8-8" />
			<path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.22.45 4.56 1.23" />
		</svg>
	);

	const PhoneCallIcon = () => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
		</svg>
	);

	const MessageSquareIcon = () => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
		</svg>
	);

	const supportTeam = [
		{
			id: 1,
			name: "Carlos R.",
			role: "Soporte Técnico Sr.",
			status: "online",
			avatar: "CR",
			color: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
		},
		{
			id: 2,
			name: "Ana M.",
			role: "Especialista en Bamapp",
			status: "online",
			avatar: "AM",
			color: "linear-gradient(135deg, #a855f7, #9333ea)",
		},
		{
			id: 3,
			name: "Luis G.",
			role: "Soporte de Cuentas",
			status: "busy",
			avatar: "LG",
			color: "linear-gradient(135deg, #c084fc, #a855f7)",
		},
		{
			id: 4,
			name: "María S.",
			role: "Coordinadora de Soporte",
			status: "online",
			avatar: "MS",
			color: "linear-gradient(135deg, #7c3aed, #6d28d9)",
		},
	];

	const recentMessages = [
		{
			id: 1,
			author: "Carlos R.",
			message: "Problema con tokens resuelto en el servidor principal",
			time: "10:45",
			avatar: "CR",
		},
		{
			id: 2,
			author: "Ana M.",
			message: "Nuevo procedimiento para apertura de cuentas disponible",
			time: "10:38",
			avatar: "AM",
		},
		{
			id: 3,
			author: "Luis G.",
			message: "¿Alguien tiene info sobre el mantenimiento programado?",
			time: "10:22",
			avatar: "LG",
		},
	];

	const keyframes = `
		@keyframes fadeInUp {
			from { opacity: 0; transform: translateY(30px); }
			to { opacity: 1; transform: translateY(0); }
		}
		@keyframes fadeInDown {
			from { opacity: 0; transform: translateY(-30px); }
			to { opacity: 1; transform: translateY(0); }
		}
		@keyframes fadeInRight {
			from { opacity: 0; transform: translateX(30px); }
			to { opacity: 1; transform: translateX(0); }
		}
		@keyframes float {
			0%, 100% { transform: translateY(0px) rotate(0deg); }
			50% { transform: translateY(-20px) rotate(3deg); }
		}
		@keyframes floatReverse {
			0%, 100% { transform: translateY(0px) rotate(0deg); }
			50% { transform: translateY(-15px) rotate(-3deg); }
		}
		@keyframes pulse {
			0%, 100% { opacity: 0.6; transform: scale(1); }
			50% { opacity: 1; transform: scale(1.05); }
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
					<div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
						<button
							style={{
								display: "flex",
								alignItems: "center",
								gap: "8px",
								color: "#6b7280",
								textDecoration: "none",
								padding: "8px 16px",
								borderRadius: "8px",
								transition: "all 0.3s ease",
								cursor: "pointer",
								border: "none",
								background: "transparent",
							}}
							onClick={() => window.history.back()}
							onMouseEnter={(e) => {
								e.target.style.background = "#f3f4f6";
								e.target.style.color = "#1f2937";
							}}
							onMouseLeave={(e) => {
								e.target.style.background = "transparent";
								e.target.style.color = "#6b7280";
							}}
						>
							<ArrowLeftIcon />
							<span>Volver</span>
						</button>

						<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
							<div
								style={{
									width: "40px",
									height: "40px",
									background: "linear-gradient(135deg, #fbbf24, #f97316)",
									borderRadius: "8px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<div
									style={{
										width: "24px",
										height: "24px",
										background: "white",
										borderRadius: "4px",
										opacity: 0.9,
									}}
								></div>
							</div>
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
				{/* Líneas decorativas moradas - arriba izquierda */}
				<div
					style={{
						position: "absolute",
						top: "40px",
						left: "6%",
						width: "240px",
						height: "12px",
						background: "linear-gradient(90deg, #c084fc 0%, #a855f7 100%)",
						borderRadius: "20px",
						transform: "rotate(-8deg)",
						animation: "float 6s ease-in-out infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "75px",
						left: "4%",
						width: "200px",
						height: "10px",
						background: "linear-gradient(90deg, #a855f7 0%, #9333ea 100%)",
						borderRadius: "20px",
						transform: "rotate(-10deg)",
						animation: "float 7s ease-in-out infinite 0.5s",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "115px",
						left: "8%",
						width: "160px",
						height: "8px",
						background: "linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%)",
						borderRadius: "20px",
						transform: "rotate(-6deg)",
						animation: "float 8s ease-in-out infinite 1s",
					}}
				></div>

				{/* Líneas decorativas moradas - abajo derecha */}
				<div
					style={{
						position: "absolute",
						bottom: "50px",
						right: "6%",
						width: "220px",
						height: "12px",
						background: "linear-gradient(90deg, #d8b4fe 0%, #c084fc 100%)",
						borderRadius: "20px",
						transform: "rotate(10deg)",
						animation: "floatReverse 6s ease-in-out infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						bottom: "85px",
						right: "8%",
						width: "180px",
						height: "10px",
						background: "linear-gradient(90deg, #e9d5ff 0%, #d8b4fe 100%)",
						borderRadius: "20px",
						transform: "rotate(8deg)",
						animation: "floatReverse 7s ease-in-out infinite 0.5s",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						bottom: "125px",
						right: "4%",
						width: "150px",
						height: "8px",
						background: "linear-gradient(90deg, #c084fc 0%, #a855f7 100%)",
						borderRadius: "20px",
						transform: "rotate(12deg)",
						animation: "floatReverse 8s ease-in-out infinite 1s",
					}}
				></div>

				{/* Círculos decorativos morados */}
				<div
					style={{
						position: "absolute",
						top: "45%",
						left: "2%",
						width: "120px",
						height: "120px",
						background: "rgba(139, 92, 246, 0.08)",
						borderRadius: "50%",
						animation: "float 10s ease-in-out infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "35%",
						right: "3%",
						width: "100px",
						height: "100px",
						background: "rgba(168, 85, 247, 0.08)",
						borderRadius: "50%",
						animation: "floatReverse 9s ease-in-out infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						bottom: "40%",
						left: "50%",
						width: "80px",
						height: "80px",
						background: "rgba(192, 132, 252, 0.06)",
						borderRadius: "50%",
						animation: "pulse 8s ease-in-out infinite",
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
						Soporte{" "}
						<span
							style={{
								background:
									"linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								backgroundClip: "text",
							}}
						>
							Interno
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
						Asistencia técnica especializada disponible las 24 horas del día
						para resolver tus dudas
					</p>

					<div
						style={{
							display: "flex",
							justifyContent: "flex-start",
							gap: "24px",
							flexWrap: "wrap",
							animation: isVisible ? "fadeInUp 1s ease-out 0.4s both" : "none",
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "8px",
								background: "linear-gradient(135deg, #f3e8ff, #faf5ff)",
								border: "1px solid #e9d5ff",
								padding: "12px 20px",
								borderRadius: "50px",
								color: "#7c3aed",
								fontWeight: "600",
							}}
						>
							<ClockIcon />
							<span>Disponible 24/7</span>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "8px",
								background: "linear-gradient(135deg, #f3e8ff, #faf5ff)",
								border: "1px solid #e9d5ff",
								padding: "12px 20px",
								borderRadius: "50px",
								color: "#7c3aed",
								fontWeight: "600",
							}}
						>
							<UsersIcon />
							<span>Equipo especializado</span>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "8px",
								background: "linear-gradient(135deg, #f3e8ff, #faf5ff)",
								border: "1px solid #e9d5ff",
								padding: "12px 20px",
								borderRadius: "50px",
								color: "#7c3aed",
								fontWeight: "600",
							}}
						>
							<CheckCircleIcon />
							<span>Respuesta inmediata</span>
						</div>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<div
				style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}
			>
				{/* Tabs */}
				<div
					style={{
						display: "flex",
						background: "white",
						borderRadius: "16px",
						padding: "8px",
						boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
						marginBottom: "32px",
						animation: isVisible ? "fadeInUp 0.8s ease-out 0.2s both" : "none",
					}}
				>
					<div
						style={{
							flex: 1,
							padding: "16px 24px",
							textAlign: "center",
							borderRadius: "12px",
							cursor: "pointer",
							transition: "all 0.3s ease",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "8px",
							fontWeight: "600",
							...(activeTab === "phone"
								? {
										background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
										color: "white",
										boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
								  }
								: {
										color: "#6b7280",
								  }),
						}}
						onClick={() => setActiveTab("phone")}
					>
						<PhoneCallIcon />
						<span>Llamar Soporte</span>
					</div>
					<div
						style={{
							flex: 1,
							padding: "16px 24px",
							textAlign: "center",
							borderRadius: "12px",
							cursor: "pointer",
							transition: "all 0.3s ease",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "8px",
							fontWeight: "600",
							...(activeTab === "chat"
								? {
										background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
										color: "white",
										boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
								  }
								: {
										color: "#6b7280",
								  }),
						}}
						onClick={() => setActiveTab("chat")}
					>
						<MessageSquareIcon />
						<span>Chat Grupal</span>
					</div>
				</div>

				{/* Content */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "2fr 1fr",
						gap: "32px",
					}}
				>
					{/* Main Content */}
					<div
						style={{
							background: "white",
							borderRadius: "16px",
							padding: "32px",
							boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
							animation: isVisible
								? "fadeInUp 0.8s ease-out 0.4s both"
								: "none",
						}}
					>
						{activeTab === "phone" ? (
							<div>
								<h2
									style={{
										fontSize: "24px",
										fontWeight: "700",
										color: "#1f2937",
										marginBottom: "16px",
									}}
								>
									Llamada Directa
								</h2>
								<p
									style={{
										color: "#6b7280",
										marginBottom: "24px",
										lineHeight: "1.6",
									}}
								>
									Habla directamente con nuestro equipo de soporte técnico.
									Estamos disponibles las 24 horas para resolver tus consultas
									urgentes.
								</p>

								<div
									style={{
										background: "#faf5ff",
										border: "1px solid #e9d5ff",
										borderRadius: "8px",
										padding: "16px",
										marginBottom: "24px",
									}}
								>
									<div
										style={{
											fontSize: "14px",
											fontWeight: "600",
											color: "#7c3aed",
											marginBottom: "8px",
											display: "flex",
											alignItems: "center",
											gap: "6px",
										}}
									>
										<ClockIcon />
										<span>Horarios de Atención</span>
									</div>
									<div
										style={{
											fontSize: "14px",
											color: "#6d28d9",
											lineHeight: "1.5",
										}}
									>
										• <strong>Lunes a Viernes:</strong> 24 horas
										<br />• <strong>Sábados y Domingos:</strong> 24 horas
										<br />• <strong>Emergencias:</strong> Siempre disponible
									</div>
								</div>

								<div
									style={{
										fontSize: "36px",
										fontWeight: "700",
										color: "#8b5cf6",
										textAlign: "center",
										marginBottom: "24px",
										letterSpacing: "0.1em",
									}}
								>
									+502 2XXX-XXXX
								</div>

								<button
									style={{
										width: "100%",
										background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
										color: "white",
										border: "none",
										padding: "16px 24px",
										borderRadius: "12px",
										fontSize: "16px",
										fontWeight: "600",
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: "8px",
										transition: "all 0.3s ease",
										marginBottom: "16px",
									}}
									onMouseEnter={(e) => {
										e.target.style.transform = "scale(1.02)";
										e.target.style.boxShadow =
											"0 8px 25px rgba(139, 92, 246, 0.4)";
									}}
									onMouseLeave={(e) => {
										e.target.style.transform = "scale(1)";
										e.target.style.boxShadow = "none";
									}}
									onClick={() => window.open("tel:+502XXXXXXX")}
								>
									<PhoneCallIcon />
									<span>Llamar Ahora</span>
								</button>

								<div
									style={{
										textAlign: "center",
										color: "#6b7280",
										fontSize: "14px",
										marginTop: "16px",
									}}
								>
									<strong>Tip:</strong> Ten a la mano tu número de empleado y
									descripción del problema
								</div>
							</div>
						) : (
							<div>
								<h2
									style={{
										fontSize: "24px",
										fontWeight: "700",
										color: "#1f2937",
										marginBottom: "16px",
									}}
								>
									Chat Grupal de Soporte
								</h2>
								<p
									style={{
										color: "#6b7280",
										marginBottom: "24px",
										lineHeight: "1.6",
									}}
								>
									Únete a la conversación con el equipo de soporte y otros
									compañeros. Comparte dudas, encuentra soluciones y mantente al
									día con las últimas actualizaciones.
								</p>

								<div style={{ marginBottom: "24px" }}>
									<h4
										style={{
											fontSize: "16px",
											fontWeight: "600",
											color: "#1f2937",
											marginBottom: "16px",
										}}
									>
										Mensajes Recientes
									</h4>
									{recentMessages.map((msg) => (
										<div
											key={msg.id}
											style={{
												padding: "12px",
												borderRadius: "8px",
												marginBottom: "12px",
												background: "#f9fafb",
												border: "1px solid #f3f4f6",
											}}
										>
											<div
												style={{
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
													marginBottom: "4px",
												}}
											>
												<span
													style={{
														fontSize: "12px",
														fontWeight: "600",
														color: "#8b5cf6",
													}}
												>
													{msg.author}
												</span>
												<span style={{ fontSize: "11px", color: "#9ca3af" }}>
													{msg.time}
												</span>
											</div>
											<div
												style={{
													fontSize: "14px",
													color: "#374151",
													lineHeight: "1.4",
												}}
											>
												{msg.message}
											</div>
										</div>
									))}
								</div>

								<button
									style={{
										width: "100%",
										background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
										color: "white",
										border: "none",
										padding: "16px 24px",
										borderRadius: "12px",
										fontSize: "16px",
										fontWeight: "600",
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										gap: "8px",
										transition: "all 0.3s ease",
										marginTop: "16px",
									}}
									onMouseEnter={(e) => {
										e.target.style.transform = "scale(1.02)";
										e.target.style.boxShadow =
											"0 8px 25px rgba(139, 92, 246, 0.4)";
									}}
									onMouseLeave={(e) => {
										e.target.style.transform = "scale(1)";
										e.target.style.boxShadow = "none";
									}}
								>
									<MessageSquareIcon />
									<span>Unirse al Chat</span>
								</button>

								<div
									style={{
										textAlign: "center",
										color: "#6b7280",
										fontSize: "14px",
										marginTop: "16px",
									}}
								>
									<strong>Activo:</strong> 127 miembros conectados ahora
								</div>
							</div>
						)}
					</div>

					{/* Sidebar */}
					<div
						style={{
							background: "white",
							borderRadius: "16px",
							padding: "24px",
							boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
							animation: isVisible
								? "fadeInRight 0.8s ease-out 0.6s both"
								: "none",
						}}
					>
						<h3
							style={{
								fontSize: "18px",
								fontWeight: "600",
								color: "#1f2937",
								marginBottom: "16px",
							}}
						>
							Equipo de Soporte
						</h3>

						{supportTeam.map((member) => (
							<div
								key={member.id}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "12px",
									padding: "12px",
									borderRadius: "8px",
									marginBottom: "8px",
									transition: "all 0.3s ease",
									cursor: "pointer",
								}}
								onMouseEnter={(e) => {
									e.target.style.background = "#faf5ff";
									e.target.style.transform = "translateX(4px)";
								}}
								onMouseLeave={(e) => {
									e.target.style.background = "transparent";
									e.target.style.transform = "translateX(0)";
								}}
							>
								<div
									style={{
										width: "40px",
										height: "40px",
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										color: "white",
										fontWeight: "600",
										fontSize: "14px",
										background: member.color,
									}}
								>
									{member.avatar}
								</div>
								<div style={{ flex: 1 }}>
									<div
										style={{
											fontSize: "14px",
											fontWeight: "600",
											color: "#1f2937",
										}}
									>
										{member.name}
									</div>
									<div style={{ fontSize: "12px", color: "#6b7280" }}>
										{member.role}
									</div>
								</div>
								<div
									style={{
										width: "8px",
										height: "8px",
										borderRadius: "50%",
										marginLeft: "auto",
										background:
											member.status === "online" ? "#10b981" : "#f59e0b",
									}}
								></div>
							</div>
						))}

						<div
							style={{
								background: "linear-gradient(135deg, #faf5ff, #f3e8ff)",
								border: "1px solid #e9d5ff",
								borderRadius: "8px",
								padding: "16px",
								marginTop: "24px",
								textAlign: "center",
							}}
						>
							<div
								style={{
									fontSize: "14px",
									fontWeight: "600",
									color: "#7c3aed",
									marginBottom: "4px",
								}}
							>
								⚡ Respuesta Promedio
							</div>
							<div
								style={{
									fontSize: "20px",
									fontWeight: "700",
									color: "#6d28d9",
								}}
							>
								&lt; 2 minutos
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
