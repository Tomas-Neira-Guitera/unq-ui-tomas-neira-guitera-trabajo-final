import { useState, useEffect } from "react";
import "../App.css";
import images from "../assets/images";

const GameBoard = ({ difficulty }) => {
	const [board, setBoard] = useState([]);
	const [selectedCells, setSelectedCells] = useState([]);
	const [matchedCells, setMatchedCells] = useState([]);

	const generateBoard = (difficulty) => {
		const imageCount =
			difficulty === "FACIL" ? 8 : difficulty === "INTERMEDIA" ? 18 : 32;
		const selectedImages = images.slice(0, imageCount);
		const pairedImages = [...selectedImages, ...selectedImages];
		return pairedImages.sort(() => Math.random() - 0.5);
	};

	useEffect(() => {
		const newBoard = generateBoard(difficulty);
		console.log("Tablero generado:", newBoard);
		setBoard(newBoard);
	}, [difficulty]);

	const handleCellClick = (index) => {
		if (
			selectedCells.length < 2 &&
			!selectedCells.includes(index) &&
			!matchedCells.includes(index)
		) {
			setSelectedCells([...selectedCells, index]);
		}
	};

	useEffect(() => {
		if (selectedCells.length === 2) {
			const [firstIndex, secondIndex] = selectedCells;
			if (board[firstIndex] === board[secondIndex]) {
				setMatchedCells([...matchedCells, firstIndex, secondIndex]);
			}
			setTimeout(() => setSelectedCells([]), 1000);
		}
	}, [selectedCells, board, matchedCells]);

	return (
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
	);
};

export default GameBoard;
