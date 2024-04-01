import React, { useState, useEffect } from "react";
import "./PuzzleGame.css";

const PuzzleGame = () => {
  const [tiles, setTiles] = useState([]);
  const [solved, setSolved] = useState(false);

  // Define the size of the grid
  const gridSize = 3;

  useEffect(() => {
    initializeGame();
  }, []);

  // Function to shuffle tiles
  const shuffleTiles = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to check if the puzzle is solved
  const checkSolved = () => {
    for (let i = 0; i < gridSize * gridSize; i++) {
      if (tiles[i] !== i) return false;
    }
    return true;
  };

  // Function to handle tile click
  const handleTileClick = (index) => {
    if (!solved) {
      const emptyIndex = tiles.indexOf(0);
      const indexToMove = tiles.indexOf(index);
      if (
        Math.abs(emptyIndex - indexToMove) === 1 ||
        Math.abs(emptyIndex - indexToMove) === gridSize
      ) {
        const newTiles = [...tiles];
        newTiles[emptyIndex] = index;
        newTiles[indexToMove] = 0;
        setTiles(newTiles);
        if (checkSolved(newTiles)) {
          setSolved(true);
        }
      }
    }
  };

  // Function to initialize the game
  const initializeGame = () => {
    const newTiles = [...Array(gridSize * gridSize).keys()];
    setTiles(shuffleTiles(newTiles));
    setSolved(false);
  };

  return (
    <div>
      <header className="header">
        <h1 className="header-title">Puzzle Game</h1>
      </header>
      <div className="highlight">
        <p>
          Arrange the numbers in ascending order by clicking on adjacent tiles
          to move them.
        </p>
      </div>
      <div className="puzzle-container">
        <div className="puzzle-board">
          {tiles.map((tile, index) => (
            <div
              key={index}
              className={`puzzle-tile ${tile === 0 ? "empty" : ""}`}
              onClick={() => handleTileClick(tile)}
            >
              {tile !== 0 && tile + 1}
            </div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={initializeGame}>Restart</button>
        </div>
        {solved && (
          <div className="message">Congratulations! You solved the puzzle!</div>
        )}
      </div>
    </div>
  );
};

export default PuzzleGame;
