import { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import GameBoard from "./components/GameBoard";

const App = () => {
  const [difficulty, setDifficulty] = useState(null);

  const handleStartGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  return (
      !difficulty ? (
        <HomePage onStartGame={handleStartGame} />
      ) : (
        <GameBoard difficulty={difficulty} />
      )
  );
};

export default App;
