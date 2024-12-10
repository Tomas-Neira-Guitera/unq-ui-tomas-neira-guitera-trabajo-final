import { useState } from "react";
import "../App.css";

const HomePage = ({ onStartGame }) => {
	const [difficulty, setDifficulty] = useState("FACIL");

	const handleStart = () => {
		onStartGame(difficulty);
	};

	return (
		<div className="container">
			<div className="card">
				<h1 className="title">JUEGO DE MEMORIA</h1>
				<div className="difficulty">
					<label className="label">DIFICULTAD:</label>
					<select
						className="select"
						value={difficulty}
						onChange={(e) => setDifficulty(e.target.value)}
					>
						<option value="FACIL">FACIL</option>
						<option value="INTERMEDIA">INTERMEDIA</option>
						<option value="DIFICIL">DIFICIL</option>
					</select>
				</div>
				<button className="button" onClick={handleStart}>
					INICIAR
				</button>
			</div>
		</div>
	);
};

export default HomePage;
