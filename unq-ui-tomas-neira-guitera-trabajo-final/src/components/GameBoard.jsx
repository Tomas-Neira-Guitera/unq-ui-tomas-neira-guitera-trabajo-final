import { useState, useEffect } from "react";
import "../App.css";
import images from "../assets/images";

const GameBoard = ({ difficulty, onReturnHome }) => {
	const [board, setBoard] = useState([]);
	const [selectedCells, setSelectedCells] = useState([]);
	const [matchedCells, setMatchedCells] = useState([]);
	const [timer, setTimer] = useState(0);
	const [isTimerActive, setIsTimerActive] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const generateBoard = (difficulty) => {
		const imageCount =
			difficulty === "FACIL" ? 8 : difficulty === "INTERMEDIA" ? 18 : 32;
		const selectedImages = images.slice(0, imageCount);
		const pairedImages = [...selectedImages, ...selectedImages];
		return pairedImages.sort(() => Math.random() - 0.5);
	};

	useEffect(() => {
		setBoard(generateBoard(difficulty));
	}, [difficulty]);

	const handleCellClick = (index) => {
		if (
			selectedCells.length < 2 &&
			!selectedCells.includes(index) &&
			!matchedCells.includes(index)
		) {
			if (!isTimerActive) {
				setIsTimerActive(true);
			}
			setSelectedCells([...selectedCells, index]);
		}
	};

	useEffect(() => {
		if (selectedCells.length === 2) {
			const [firstIndex, secondIndex] = selectedCells;
			if (board[firstIndex] === board[secondIndex]) {
				setMatchedCells((prevMatchedCells) => [
					...prevMatchedCells,
					firstIndex,
					secondIndex,
				]);
			}
			setTimeout(() => setSelectedCells([]), 1000);
		}
	}, [selectedCells, board]);

	useEffect(() => {
		let interval;

		if (isTimerActive) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer + 1);
			}, 1000);
		}

		if (matchedCells.length === board.length && board.length > 0) {
			setIsTimerActive(false);
			setShowModal(true);
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isTimerActive, matchedCells, board]);

	return (
		<div className="card">
			<div className="timer button">{timer} segundos</div>
			<div
				className="grid"
				style={{
					gridTemplateColumns: `repeat(${Math.sqrt(board.length)}, 1fr)`,
				}}
			>
				{board.map((image, index) => (
					<div
						key={index}
						className={`cell ${
							selectedCells.includes(index) || matchedCells.includes(index)
								? "flipped"
								: ""
						}`}
						onClick={() => handleCellClick(index)}
					>
						<div className="front"></div>
						<div
							className="back"
							style={{ backgroundImage: `url(${image})` }}
						></div>
					</div>
				))}
			</div>

			{showModal && (
				<div className="modal">
					<div className="modal-content">
						<h2>¡Juego Finalizado!</h2>
						<p>Tiempo: {timer} segundos</p>
						<button className="button" onClick={onReturnHome}>
							Volver al Inicio
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default GameBoard;
