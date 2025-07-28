import React, { useState, useEffect, useRef } from "react";

export default function BamChatbot() {
	const [isVisible, setIsVisible] = useState(false);
	const [messages, setMessages] = useState([
		{
			id: 1,
			type: "bot",
			content:
				"¡Hola! Soy el asistente de Bam Conecta 360. ¿En qué puedo ayudarte hoy?",
			timestamp: new Date(),
		},
	]);
	const [inputMessage, setInputMessage] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef(null);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

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

	const SendIcon = () => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<line x1="22" y1="2" x2="11" y2="13" />
			<polygon points="22,2 15,22 11,13 2,9 22,2" />
		</svg>
	);

	const BotIcon = () => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<rect x="3" y="11" width="18" height="10" rx="2" ry="2" />
			<circle cx="12" cy="5" r="2" />
			<path d="M12 7v4" />
			<line x1="8" y1="16" x2="8" y2="16" />
			<line x1="16" y1="16" x2="16" y2="16" />
		</svg>
	);

	const UserIcon = () => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	);

	const StarIcon = () => (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" />
		</svg>
	);

	// Sugerencias predefinidas
	const suggestions = [
		"Guía de Apertura de Cuenta",
		"Preguntas frecuentes Bamapp",
		"Quickstart Bamapp",
	];

	// Respuestas simuladas del bot
	const botResponses = {
		token:
			"El procedimiento para habilitar el token por primera vez en Bamapp es:\n\n• Ingresar sesión con credenciales\n• Asignar medidas de seguridad\n• ...\n• Listo, el token debería estar habilitado.",
		apertura:
			"Para la apertura de cuenta necesitas completar los siguientes pasos:\n\n1. Verificación de identidad\n2. Documentación requerida\n3. Configuración inicial\n4. Activación del token",
		bamapp:
			"Bamapp es nuestra aplicación principal. ¿Necesitas ayuda con algún proceso específico como configuración, uso de funciones o resolución de problemas?",
		default:
			"Entiendo tu consulta. Te recomiendo revisar nuestras guías disponibles o contactar al soporte técnico para una asistencia más personalizada.",
	};

	const handleSendMessage = () => {
		if (!inputMessage.trim()) return;

		// Agregar mensaje del usuario
		const userMessage = {
			id: messages.length + 1,
			type: "user",
			content: inputMessage,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputMessage("");
		setIsTyping(true);

		// Simular respuesta del bot
		setTimeout(() => {
			let botResponse = botResponses.default;

			// Detectar palabras clave para respuestas específicas
			const lowerInput = inputMessage.toLowerCase();
			if (lowerInput.includes("token")) {
				botResponse = botResponses.token;
			} else if (
				lowerInput.includes("apertura") ||
				lowerInput.includes("cuenta")
			) {
				botResponse = botResponses.apertura;
			} else if (lowerInput.includes("bamapp")) {
				botResponse = botResponses.bamapp;
			}

			const botMessage = {
				id: messages.length + 2,
				type: "bot",
				content: botResponse,
				timestamp: new Date(),
			};

			setMessages((prev) => [...prev, botMessage]);
			setIsTyping(false);
		}, 1500);
	};

	const handleSuggestionClick = (suggestion) => {
		setInputMessage(suggestion);
	};

	const formatTime = (date) => {
		return date.toLocaleTimeString("es-ES", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

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
		chatHeader: {
			background: "linear-gradient(135deg, #14b8a6, #0d9488)",
			color: "white",
			padding: "24px",
			textAlign: "center",
			animation: isVisible ? "fadeInDown 0.8s ease-out" : "none",
		},
		chatTitle: {
			fontSize: "32px",
			fontWeight: "700",
			marginBottom: "8px",
		},
		chatSubtitle: {
			fontSize: "16px",
			opacity: 0.9,
		},
		mainContent: {
			maxWidth: "1200px",
			margin: "0 auto",
			padding: "32px 24px",
			display: "grid",
			gridTemplateColumns: "1fr 300px",
			gap: "32px",
			minHeight: "calc(100vh - 200px)",
		},
		chatContainer: {
			background: "white",
			borderRadius: "16px",
			boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
			display: "flex",
			flexDirection: "column",
			height: "600px",
			animation: isVisible ? "fadeInUp 0.8s ease-out 0.2s both" : "none",
		},
		messagesContainer: {
			flex: 1,
			padding: "24px",
			overflowY: "auto",
			display: "flex",
			flexDirection: "column",
			gap: "16px",
		},
		message: {
			display: "flex",
			gap: "12px",
			maxWidth: "80%",
		},
		userMessage: {
			alignSelf: "flex-end",
			flexDirection: "row-reverse",
		},
		messageAvatar: {
			width: "32px",
			height: "32px",
			borderRadius: "50%",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: 0,
		},
		botAvatar: {
			background: "linear-gradient(135deg, #14b8a6, #0d9488)",
			color: "white",
		},
		userAvatarMsg: {
			background: "linear-gradient(135deg, #60a5fa, #a855f7)",
			color: "white",
		},
		messageContent: {
			padding: "12px 16px",
			borderRadius: "16px",
			fontSize: "14px",
			lineHeight: "1.5",
		},
		botMessage: {
			background: "#f3f4f6",
			color: "#1f2937",
		},
		userMessageContent: {
			background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
			color: "white",
		},
		messageTime: {
			fontSize: "11px",
			color: "#9ca3af",
			marginTop: "4px",
		},
		typingIndicator: {
			display: "flex",
			gap: "12px",
			maxWidth: "80%",
		},
		typingDots: {
			display: "flex",
			gap: "4px",
			padding: "12px 16px",
			background: "#f3f4f6",
			borderRadius: "16px",
		},
		dot: {
			width: "8px",
			height: "8px",
			borderRadius: "50%",
			background: "#9ca3af",
			animation: "bounce 1.4s infinite ease-in-out",
		},
		inputContainer: {
			padding: "24px",
			borderTop: "1px solid #e5e7eb",
		},
		inputWrapper: {
			display: "flex",
			gap: "12px",
			alignItems: "flex-end",
		},
		messageInput: {
			flex: 1,
			padding: "12px 16px",
			border: "2px solid #e5e7eb",
			borderRadius: "12px",
			fontSize: "14px",
			outline: "none",
			transition: "border-color 0.3s ease",
			resize: "none",
			minHeight: "44px",
			maxHeight: "120px",
		},
		sendButton: {
			background: "linear-gradient(135deg, #14b8a6, #0d9488)",
			color: "white",
			border: "none",
			borderRadius: "12px",
			padding: "12px",
			cursor: "pointer",
			transition: "all 0.3s ease",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		sidebar: {
			animation: isVisible ? "fadeInRight 0.8s ease-out 0.4s both" : "none",
		},
		sidebarSection: {
			background: "white",
			borderRadius: "16px",
			padding: "24px",
			boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
		},
		sidebarTitle: {
			fontSize: "18px",
			fontWeight: "600",
			color: "#1f2937",
			marginBottom: "16px",
		},
		suggestionItem: {
			display: "flex",
			alignItems: "center",
			gap: "8px",
			padding: "12px",
			borderRadius: "8px",
			cursor: "pointer",
			transition: "all 0.3s ease",
			fontSize: "14px",
			color: "#4f46e5",
			textDecoration: "none",
			marginBottom: "8px",
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
		@keyframes bounce {
			0%, 80%, 100% {
				transform: scale(0);
			}
			40% {
				transform: scale(1);
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

			{/* Chat Header */}
			<section style={baseStyles.chatHeader}>
				<h1 style={baseStyles.chatTitle}>Chatbot Interno</h1>
				<p style={baseStyles.chatSubtitle}>
					Obtén respuestas instantáneas a tus preguntas con nuestro asistente
					inteligente
				</p>
			</section>

			{/* Main Content */}
			<div style={baseStyles.mainContent}>
				{/* Chat Container */}
				<div style={baseStyles.chatContainer}>
					{/* Messages */}
					<div style={baseStyles.messagesContainer}>
						{messages.map((message) => (
							<div
								key={message.id}
								style={{
									...baseStyles.message,
									...(message.type === "user" ? baseStyles.userMessage : {}),
								}}
							>
								<div
									style={{
										...baseStyles.messageAvatar,
										...(message.type === "bot"
											? baseStyles.botAvatar
											: baseStyles.userAvatarMsg),
									}}
								>
									{message.type === "bot" ? <BotIcon /> : <UserIcon />}
								</div>
								<div>
									<div
										style={{
											...baseStyles.messageContent,
											...(message.type === "bot"
												? baseStyles.botMessage
												: baseStyles.userMessageContent),
										}}
									>
										{message.content.split("\n").map((line, index) => (
											<div key={index}>{line}</div>
										))}
									</div>
									<div style={baseStyles.messageTime}>
										{formatTime(message.timestamp)}
									</div>
								</div>
							</div>
						))}

						{/* Typing Indicator */}
						{isTyping && (
							<div style={baseStyles.typingIndicator}>
								<div style={baseStyles.botAvatar}>
									<BotIcon />
								</div>
								<div style={baseStyles.typingDots}>
									<div
										style={{ ...baseStyles.dot, animationDelay: "0s" }}
									></div>
									<div
										style={{ ...baseStyles.dot, animationDelay: "0.2s" }}
									></div>
									<div
										style={{ ...baseStyles.dot, animationDelay: "0.4s" }}
									></div>
								</div>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>

					{/* Input */}
					<div style={baseStyles.inputContainer}>
						<div style={baseStyles.inputWrapper}>
							<textarea
								style={{
									...baseStyles.messageInput,
									borderColor: inputMessage ? "#14b8a6" : "#e5e7eb",
								}}
								placeholder="Escribe tu consulta aquí..."
								value={inputMessage}
								onChange={(e) => setInputMessage(e.target.value)}
								onKeyPress={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										handleSendMessage();
									}
								}}
							/>
							<button
								style={{
									...baseStyles.sendButton,
									opacity: inputMessage.trim() ? 1 : 0.5,
									transform: "scale(1)",
								}}
								onClick={handleSendMessage}
								disabled={!inputMessage.trim()}
								onMouseEnter={(e) => {
									if (inputMessage.trim()) {
										e.target.style.transform = "scale(1.05)";
									}
								}}
								onMouseLeave={(e) => {
									e.target.style.transform = "scale(1)";
								}}
							>
								<SendIcon />
							</button>
						</div>
					</div>
				</div>

				{/* Sidebar */}
				<div style={baseStyles.sidebar}>
					<div style={baseStyles.sidebarSection}>
						<h3 style={baseStyles.sidebarTitle}>Recursos sugeridos</h3>
						{suggestions.map((suggestion, index) => (
							<div
								key={index}
								style={baseStyles.suggestionItem}
								onClick={() => handleSuggestionClick(suggestion)}
								onMouseEnter={(e) => {
									e.target.style.background = "#eff6ff";
									e.target.style.transform = "translateX(4px)";
								}}
								onMouseLeave={(e) => {
									e.target.style.background = "transparent";
									e.target.style.transform = "translateX(0)";
								}}
							>
								<StarIcon />
								<span>{suggestion}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
