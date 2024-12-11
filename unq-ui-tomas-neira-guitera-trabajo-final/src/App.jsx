import { useState } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import GameBoard from "./components/GameBoard";

const App = () => {
  const [difficulty, setDifficulty] = useState(null);

  const handleStartGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  const handleReturnHome = () => {
    setDifficulty(null);
  };

  return (
    <>
      {!difficulty ? (
        <HomePage onStartGame={handleStartGame} />
      ) : (
        <GameBoard
          difficulty={difficulty}
          onReturnHome={handleReturnHome}
        />
      )}
    </>
  );
};

export default App;
