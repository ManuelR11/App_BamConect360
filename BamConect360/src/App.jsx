import { useState } from "react";
import "./App.css";
import BamConecta360 from "./Components/HomePage";
import { BrowserRouter } from "react-router-dom";
import Guias from "./Components/Guias";
import { Routes, Route } from "react-router-dom";
import Chatbot from "./Components/Chatbot";
import Soporte from "./Components/SoporteInterno";

function App() {
	const [count, setCount] = useState(0);

	return (
		<Routes>
			<Route path="/" element={<BamConecta360 />} />
			<Route path="/guias" element={<Guias />} />
			<Route path="/chatbot" element={<Chatbot />} />
			<Route path="/soporte" element={<Soporte />} />
		</Routes>
	);
}

export default App;
