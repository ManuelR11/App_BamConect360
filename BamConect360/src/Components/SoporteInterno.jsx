import React, { useState, useEffect } from "react";

export default function BamSoporteInterno() {
	const [isVisible, setIsVisible] = useState(false);
	const [hoveredCard, setHoveredCard] = useState(null);
	const [activeTab, setActiveTab] = useState("phone");

	useEffect(() => {
		setIsVisible(true);
	}, []);

	// Iconos SVG
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

	// Miembros del equipo de soporte (simulados)
	const supportTeam = [
		{
			id: 1,
			name: "Carlos R.",
			role: "Soporte Técnico Sr.",
			status: "online",
			avatar: "CR",
			color: "linear-gradient(135deg, #10b981, #059669)",
		},
		{
			id: 2,
			name: "Ana M.",
			role: "Especialista en Bamapp",
			status: "online",
			avatar: "AM",
			color: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
		},
		{
			id: 3,
			name: "Luis G.",
			role: "Soporte de Cuentas",
			status: "busy",
			avatar: "LG",
			color: "linear-gradient(135deg, #f59e0b, #d97706)",
		},
		{
			id: 4,
			name: "María S.",
			role: "Coordinadora de Soporte",
			status: "online",
			avatar: "MS",
			color: "linear-gradient(135deg, #ef4444, #dc2626)",
		},
	];

	// Mensajes recientes del chat grupal (simulados)
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
		backButton: {
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
			background: "linear-gradient(135deg, #8b5cf6, #8567C7)",
			color: "white",
			padding: "64px 24px",
			textAlign: "center",
			position: "relative",
			overflow: "hidden",
			animation: isVisible ? "fadeInDown 0.8s ease-out" : "none",
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
			marginBottom: "16px",
			letterSpacing: "-0.02em",
		},
		heroSubtitle: {
			fontSize: "20px",
			opacity: 0.9,
			marginBottom: "32px",
			maxWidth: "600px",
			margin: "0 auto",
		},
		heroStats: {
			display: "flex",
			justifyContent: "center",
			gap: "48px",
			marginTop: "32px",
		},
		statItem: {
			display: "flex",
			alignItems: "center",
			gap: "8px",
			background: "rgba(255, 255, 255, 0.1)",
			backdropFilter: "blur(10px)",
			padding: "12px 20px",
			borderRadius: "50px",
		},
		mainContent: {
			maxWidth: "1200px",
			margin: "0 auto",
			padding: "64px 24px",
		},
		tabContainer: {
			display: "flex",
			background: "white",
			borderRadius: "16px",
			padding: "8px",
			boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
			marginBottom: "32px",
			animation: isVisible ? "fadeInUp 0.8s ease-out 0.2s both" : "none",
		},
		tab: {
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
		},
		activeTab: {
			background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
			color: "white",
			boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
		},
		inactiveTab: {
			color: "#6b7280",
		},
		contentContainer: {
			display: "grid",
			gridTemplateColumns: "2fr 1fr",
			gap: "32px",
		},
		mainCard: {
			background: "white",
			borderRadius: "16px",
			padding: "32px",
			boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
			animation: isVisible ? "fadeInUp 0.8s ease-out 0.4s both" : "none",
		},
		sideCard: {
			background: "white",
			borderRadius: "16px",
			padding: "24px",
			boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
			animation: isVisible ? "fadeInRight 0.8s ease-out 0.6s both" : "none",
		},
		cardTitle: {
			fontSize: "24px",
			fontWeight: "700",
			color: "#1f2937",
			marginBottom: "16px",
		},
		cardSubtitle: {
			color: "#6b7280",
			marginBottom: "24px",
			lineHeight: "1.6",
		},
		phoneNumber: {
			fontSize: "36px",
			fontWeight: "700",
			color: "#8b5cf6",
			textAlign: "center",
			marginBottom: "24px",
			letterSpacing: "0.1em",
		},
		callButton: {
			width: "100%",
			background: "linear-gradient(135deg, #10b981, #059669)",
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
		},
		scheduleInfo: {
			background: "#f0f9f4",
			border: "1px solid #d1fae5",
			borderRadius: "8px",
			padding: "16px",
			marginBottom: "24px",
		},
		scheduleTitle: {
			fontSize: "14px",
			fontWeight: "600",
			color: "#065f46",
			marginBottom: "8px",
			display: "flex",
			alignItems: "center",
			gap: "6px",
		},
		scheduleText: {
			fontSize: "14px",
			color: "#047857",
			lineHeight: "1.5",
		},
		teamMember: {
			display: "flex",
			alignItems: "center",
			gap: "12px",
			padding: "12px",
			borderRadius: "8px",
			marginBottom: "8px",
			transition: "all 0.3s ease",
			cursor: "pointer",
		},
		memberAvatar: {
			width: "40px",
			height: "40px",
			borderRadius: "50%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			color: "white",
			fontWeight: "600",
			fontSize: "14px",
		},
		memberInfo: {
			flex: 1,
		},
		memberName: {
			fontSize: "14px",
			fontWeight: "600",
			color: "#1f2937",
		},
		memberRole: {
			fontSize: "12px",
			color: "#6b7280",
		},
		statusIndicator: {
			width: "8px",
			height: "8px",
			borderRadius: "50%",
			marginLeft: "auto",
		},
		onlineStatus: {
			background: "#10b981",
		},
		busyStatus: {
			background: "#f59e0b",
		},
		chatMessage: {
			padding: "12px",
			borderRadius: "8px",
			marginBottom: "12px",
			background: "#f9fafb",
			border: "1px solid #f3f4f6",
		},
		messageHeader: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: "4px",
		},
		messageAuthor: {
			fontSize: "12px",
			fontWeight: "600",
			color: "#4f46e5",
		},
		messageTime: {
			fontSize: "11px",
			color: "#9ca3af",
		},
		messageText: {
			fontSize: "14px",
			color: "#374151",
			lineHeight: "1.4",
		},
		joinChatButton: {
			width: "100%",
			background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
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
		},
	};

	const keyframes = `
		@keyframes fadeInDown {
			from {
				opacity: 0;
				transform: translateY(-30px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}
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
		@keyframes fadeInRight {
			from {
				opacity: 0;
				transform: translateX(30px);
			}
			to {
				opacity: 1;
				transform: translateX(0);
			}
		}
		@keyframes pulse {
			0%, 100% {
				opacity: 0.6;
				transform: scale(1);
			}
			50% {
				opacity: 1;
				transform: scale(1.05);
			}
		}
	`;

	return (
		<div style={baseStyles.container}>
			<style>{keyframes}</style>

			{/* Header */}
			<header style={baseStyles.header}>
				<div style={baseStyles.headerContent}>
					<div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
						<button
							style={baseStyles.backButton}
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

						<div style={baseStyles.logo}>
							<div style={baseStyles.logoIcon}>
								<div style={baseStyles.logoIconInner}></div>
							</div>
							<span style={baseStyles.logoText}>Bam</span>
						</div>
					</div>

					<div style={baseStyles.userInfo}>
						<div style={baseStyles.userAvatar}>MH</div>
						<span style={{ color: "#6b7280" }}>Marta H.</span>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section style={baseStyles.hero}>
				{/* Elementos decorativos */}
				<div
					style={{
						position: "absolute",
						top: "40px",
						left: "80px",
						width: "60px",
						height: "60px",
						background: "rgba(255, 255, 255, 0.1)",
						borderRadius: "50%",
						animation: "pulse 2s infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						bottom: "60px",
						right: "120px",
						width: "80px",
						height: "80px",
						background: "rgba(255, 255, 255, 0.1)",
						borderRadius: "50%",
						animation: "pulse 2s infinite 1s",
					}}
				></div>

				<div style={baseStyles.heroContent}>
					<h1 style={baseStyles.heroTitle}>Soporte Interno</h1>
					<p style={baseStyles.heroSubtitle}>
						Asistencia técnica especializada disponible las 24 horas del día
						para resolver tus dudas
					</p>

					<div style={baseStyles.heroStats}>
						<div style={baseStyles.statItem}>
							<ClockIcon />
							<span>Disponible 24/7</span>
						</div>
						<div style={baseStyles.statItem}>
							<UsersIcon />
							<span>Equipo especializado</span>
						</div>
						<div style={baseStyles.statItem}>
							<CheckCircleIcon />
							<span>Respuesta inmediata</span>
						</div>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<div style={baseStyles.mainContent}>
				{/* Tabs */}
				<div style={baseStyles.tabContainer}>
					<div
						style={{
							...baseStyles.tab,
							...(activeTab === "phone"
								? baseStyles.activeTab
								: baseStyles.inactiveTab),
						}}
						onClick={() => setActiveTab("phone")}
					>
						<PhoneCallIcon />
						<span>Llamar Soporte</span>
					</div>
					<div
						style={{
							...baseStyles.tab,
							...(activeTab === "chat"
								? baseStyles.activeTab
								: baseStyles.inactiveTab),
						}}
						onClick={() => setActiveTab("chat")}
					>
						<MessageSquareIcon />
						<span>Chat Grupal</span>
					</div>
				</div>

				{/* Content */}
				<div style={baseStyles.contentContainer}>
					{/* Main Content */}
					<div style={baseStyles.mainCard}>
						{activeTab === "phone" ? (
							<div>
								<h2 style={baseStyles.cardTitle}>Llamada Directa</h2>
								<p style={baseStyles.cardSubtitle}>
									Habla directamente con nuestro equipo de soporte técnico.
									Estamos disponibles las 24 horas para resolver tus consultas
									urgentes.
								</p>

								<div style={baseStyles.scheduleInfo}>
									<div style={baseStyles.scheduleTitle}>
										<ClockIcon />
										<span>Horarios de Atención</span>
									</div>
									<div style={baseStyles.scheduleText}>
										• <strong>Lunes a Viernes:</strong> 24 horas
										<br />• <strong>Sábados y Domingos:</strong> 24 horas
										<br />• <strong>Emergencias:</strong> Siempre disponible
									</div>
								</div>

								<div style={baseStyles.phoneNumber}>+502 2XXX-XXXX</div>

								<button
									style={baseStyles.callButton}
									onMouseEnter={(e) => {
										e.target.style.transform = "scale(1.02)";
										e.target.style.boxShadow =
											"0 8px 25px rgba(16, 185, 129, 0.3)";
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
								<h2 style={baseStyles.cardTitle}>Chat Grupal de Soporte</h2>
								<p style={baseStyles.cardSubtitle}>
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
										<div key={msg.id} style={baseStyles.chatMessage}>
											<div style={baseStyles.messageHeader}>
												<span style={baseStyles.messageAuthor}>
													{msg.author}
												</span>
												<span style={baseStyles.messageTime}>{msg.time}</span>
											</div>
											<div style={baseStyles.messageText}>{msg.message}</div>
										</div>
									))}
								</div>

								<button
									style={baseStyles.joinChatButton}
									onMouseEnter={(e) => {
										e.target.style.transform = "scale(1.02)";
										e.target.style.boxShadow =
											"0 8px 25px rgba(59, 130, 246, 0.3)";
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
					<div style={baseStyles.sideCard}>
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
								style={baseStyles.teamMember}
								onMouseEnter={(e) => {
									e.target.style.background = "#f9fafb";
									e.target.style.transform = "translateX(4px)";
								}}
								onMouseLeave={(e) => {
									e.target.style.background = "transparent";
									e.target.style.transform = "translateX(0)";
								}}
							>
								<div
									style={{
										...baseStyles.memberAvatar,
										background: member.color,
									}}
								>
									{member.avatar}
								</div>
								<div style={baseStyles.memberInfo}>
									<div style={baseStyles.memberName}>{member.name}</div>
									<div style={baseStyles.memberRole}>{member.role}</div>
								</div>
								<div
									style={{
										...baseStyles.statusIndicator,
										...(member.status === "online"
											? baseStyles.onlineStatus
											: baseStyles.busyStatus),
									}}
								></div>
							</div>
						))}

						<div
							style={{
								background: "#fef3c7",
								border: "1px solid #fbbf24",
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
									color: "#92400e",
									marginBottom: "4px",
								}}
							>
								⚡ Respuesta Promedio
							</div>
							<div
								style={{
									fontSize: "20px",
									fontWeight: "700",
									color: "#78350f",
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
