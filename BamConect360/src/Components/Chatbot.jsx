import React, { useState, useEffect, useRef } from "react";
import logoImpresion from "../assets/logo-impresion.png";

export default function BamChatbot() {
	// Detectar automáticamente la URL del backend
	const API_BASE_URL =
		window.location.hostname === "localhost"
			? "http://localhost:3001/api"
			: `${window.location.origin}/api`;

	const [isVisible, setIsVisible] = useState(false);
	const [messages, setMessages] = useState([
		{
			id: 1,
			type: "bot",
			content:
				"¡Hola! Soy el asistente de Bam Conecta 360 entrenado con documentos específicos. ¿En qué puedo ayudarte hoy?",
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

	const suggestions = [
		"¿Cómo abrir una cuenta?",
		"¿Qué documentos necesito?",
		"¿Cómo funciona el token?",
	];

	const handleSendMessage = async () => {
		if (!inputMessage.trim()) return;

		const userMessage = {
			id: messages.length + 1,
			type: "user",
			content: inputMessage,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		const currentMessage = inputMessage;
		setInputMessage("");
		setIsTyping(true);

		try {
			const response = await fetch(`${API_BASE_URL}/chat`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: currentMessage }),
			});

			if (response.ok) {
				const data = await response.json();
				const botMessage = {
					id: messages.length + 2,
					type: "bot",
					content: data.response,
					timestamp: new Date(),
				};
				setMessages((prev) => [...prev, botMessage]);
			} else {
				const errorData = await response.json();
				const errorMessage = {
					id: messages.length + 2,
					type: "bot",
					content: `Lo siento, ocurrió un error: ${errorData.error}`,
					timestamp: new Date(),
				};
				setMessages((prev) => [...prev, errorMessage]);
			}
		} catch (error) {
			console.error("Error enviando mensaje:", error);
			const errorMessage = {
				id: messages.length + 2,
				type: "bot",
				content:
					"Lo siento, no pude conectar con el servidor. Por favor, verifica que el backend esté funcionando.",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsTyping(false);
		}
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
		@keyframes bounce {
			0%, 80%, 100% { transform: scale(0); }
			40% { transform: scale(1); }
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
					padding: "60px 24px 50px 24px",
					boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
				}}
			>
				{/* Líneas decorativas verdes/turquesa - arriba izquierda */}
				<div
					style={{
						position: "absolute",
						top: "30px",
						left: "6%",
						width: "240px",
						height: "12px",
						background: "linear-gradient(90deg, #6ee7b7 0%, #34d399 100%)",
						borderRadius: "20px",
						transform: "rotate(-8deg)",
						animation: "float 6s ease-in-out infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "60px",
						left: "4%",
						width: "200px",
						height: "10px",
						background: "linear-gradient(90deg, #5eead4 0%, #2dd4bf 100%)",
						borderRadius: "20px",
						transform: "rotate(-10deg)",
						animation: "float 7s ease-in-out infinite 0.5s",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "95px",
						left: "8%",
						width: "160px",
						height: "8px",
						background: "linear-gradient(90deg, #14b8a6 0%, #0d9488 100%)",
						borderRadius: "20px",
						transform: "rotate(-6deg)",
						animation: "float 8s ease-in-out infinite 1s",
					}}
				></div>

				{/* Líneas decorativas verdes/turquesa - abajo derecha */}
				<div
					style={{
						position: "absolute",
						bottom: "40px",
						right: "6%",
						width: "220px",
						height: "12px",
						background: "linear-gradient(90deg, #a7f3d0 0%, #6ee7b7 100%)",
						borderRadius: "20px",
						transform: "rotate(10deg)",
						animation: "floatReverse 6s ease-in-out infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						bottom: "70px",
						right: "8%",
						width: "180px",
						height: "10px",
						background: "linear-gradient(90deg, #99f6e4 0%, #5eead4 100%)",
						borderRadius: "20px",
						transform: "rotate(8deg)",
						animation: "floatReverse 7s ease-in-out infinite 0.5s",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						bottom: "105px",
						right: "4%",
						width: "150px",
						height: "8px",
						background: "linear-gradient(90deg, #34d399 0%, #10b981 100%)",
						borderRadius: "20px",
						transform: "rotate(12deg)",
						animation: "floatReverse 8s ease-in-out infinite 1s",
					}}
				></div>

				{/* Círculos decorativos verdes */}
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "2%",
						width: "110px",
						height: "110px",
						background: "rgba(20, 184, 166, 0.08)",
						borderRadius: "50%",
						animation: "float 10s ease-in-out infinite",
					}}
				></div>
				<div
					style={{
						position: "absolute",
						top: "40%",
						right: "3%",
						width: "90px",
						height: "90px",
						background: "rgba(16, 185, 129, 0.08)",
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
						textAlign: "center",
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
						Chatbot{" "}
						<span
							style={{
								background:
									"linear-gradient(135deg, #14b8a6 0%, #10b981 50%, #34d399 100%)",
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
							maxWidth: "700px",
							margin: "0 auto",
							lineHeight: "1.6",
							animation: isVisible ? "fadeInUp 1s ease-out 0.2s both" : "none",
						}}
					>
						Obtén respuestas instantáneas a tus preguntas con nuestro asistente
						inteligente
					</p>
				</div>
			</section>

			{/* Main Content */}
			<div
				style={{
					maxWidth: "1200px",
					margin: "0 auto",
					padding: "32px 24px",
					display: "grid",
					gridTemplateColumns: "1fr 300px",
					gap: "32px",
					minHeight: "calc(100vh - 200px)",
				}}
			>
				{/* Chat Container */}
				<div
					style={{
						background: "white",
						borderRadius: "16px",
						boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
						display: "flex",
						flexDirection: "column",
						height: "600px",
						animation: isVisible ? "fadeInUp 0.8s ease-out 0.2s both" : "none",
					}}
				>
					{/* Messages */}
					<div
						style={{
							flex: 1,
							padding: "24px",
							overflowY: "auto",
							display: "flex",
							flexDirection: "column",
							gap: "16px",
						}}
					>
						{messages.map((message) => (
							<div
								key={message.id}
								style={{
									display: "flex",
									gap: "12px",
									maxWidth: "80%",
									...(message.type === "user"
										? { alignSelf: "flex-end", flexDirection: "row-reverse" }
										: {}),
								}}
							>
								<div
									style={{
										width: "32px",
										height: "32px",
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										flexShrink: 0,
										...(message.type === "bot"
											? {
													background:
														"linear-gradient(135deg, #14b8a6, #10b981)",
													color: "white",
											  }
											: {
													background:
														"linear-gradient(135deg, #60a5fa, #a855f7)",
													color: "white",
											  }),
									}}
								>
									{message.type === "bot" ? <BotIcon /> : <UserIcon />}
								</div>
								<div>
									<div
										style={{
											padding: "12px 16px",
											borderRadius: "16px",
											fontSize: "14px",
											lineHeight: "1.5",
											...(message.type === "bot"
												? { background: "#f3f4f6", color: "#1f2937" }
												: {
														background:
															"linear-gradient(135deg, #3b82f6, #8b5cf6)",
														color: "white",
												  }),
										}}
									>
										{message.content.split("\n").map((line, index) => (
											<div key={index}>{line}</div>
										))}
									</div>
									<div
										style={{
											fontSize: "11px",
											color: "#9ca3af",
											marginTop: "4px",
										}}
									>
										{formatTime(message.timestamp)}
									</div>
								</div>
							</div>
						))}

						{/* Typing Indicator */}
						{isTyping && (
							<div style={{ display: "flex", gap: "12px", maxWidth: "80%" }}>
								<div
									style={{
										width: "32px",
										height: "32px",
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										background: "linear-gradient(135deg, #14b8a6, #10b981)",
										color: "white",
									}}
								>
									<BotIcon />
								</div>
								<div
									style={{
										display: "flex",
										gap: "4px",
										padding: "12px 16px",
										background: "#f3f4f6",
										borderRadius: "16px",
									}}
								>
									<div
										style={{
											width: "8px",
											height: "8px",
											borderRadius: "50%",
											background: "#9ca3af",
											animation: "bounce 1.4s infinite ease-in-out",
											animationDelay: "0s",
										}}
									></div>
									<div
										style={{
											width: "8px",
											height: "8px",
											borderRadius: "50%",
											background: "#9ca3af",
											animation: "bounce 1.4s infinite ease-in-out",
											animationDelay: "0.2s",
										}}
									></div>
									<div
										style={{
											width: "8px",
											height: "8px",
											borderRadius: "50%",
											background: "#9ca3af",
											animation: "bounce 1.4s infinite ease-in-out",
											animationDelay: "0.4s",
										}}
									></div>
								</div>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>

					{/* Input */}
					<div style={{ padding: "24px", borderTop: "1px solid #e5e7eb" }}>
						<div
							style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}
						>
							<textarea
								style={{
									flex: 1,
									padding: "12px 16px",
									border: inputMessage
										? "2px solid #14b8a6"
										: "2px solid #e5e7eb",
									borderRadius: "12px",
									fontSize: "14px",
									outline: "none",
									transition: "border-color 0.3s ease",
									resize: "none",
									minHeight: "44px",
									maxHeight: "120px",
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
									opacity: inputMessage.trim() ? 1 : 0.5,
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
				<div
					style={{
						animation: isVisible
							? "fadeInRight 0.8s ease-out 0.4s both"
							: "none",
					}}
				>
					<div
						style={{
							background: "white",
							borderRadius: "16px",
							padding: "24px",
							boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
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
							Recursos sugeridos
						</h3>
						{suggestions.map((suggestion, index) => (
							<div
								key={index}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "8px",
									padding: "12px",
									borderRadius: "8px",
									cursor: "pointer",
									transition: "all 0.3s ease",
									fontSize: "14px",
									color: "#14b8a6",
									marginBottom: "8px",
									fontWeight: "500",
								}}
								onClick={() => handleSuggestionClick(suggestion)}
								onMouseEnter={(e) => {
									e.target.style.background = "#ecfdf5";
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

						<div
							style={{
								background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
								border: "1px solid #a7f3d0",
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
									color: "#065f46",
									marginBottom: "4px",
								}}
							>
								💬 Estado del Bot
							</div>
							<div
								style={{
									fontSize: "20px",
									fontWeight: "700",
									color: "#047857",
								}}
							>
								En línea
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
