import React, { useState, useCallback } from "react";
import Board from "./Board";
import { winningCombos } from "../Constants/constants";

// Game component
const Game = React.memo(() => {
  // State variables
  const [board, setBoard] = useState(Array(9).fill(null)); // State for the tic-tac-toe board
  const [winner, setWinner] = useState(null); // State for the winner of the game
  const [player, setPlayer] = useState(null); // State for the current player (X or O)
  const [cpuPlayer, setCpuPlayer] = useState(null); // State for the CPU player (X or O)
  const [winningSequence, setWinningSequence] = useState([]); // State for winning sequence
  const [loading, setLoading] = useState(false); // State for loading while we get api response

  // Function to handle player selection (X or O)
  const handlePlayerSelect = useCallback((selectedSymbol) => {
    setPlayer(selectedSymbol); // Set the selected player
    setCpuPlayer(selectedSymbol === "X" ? "O" : "X"); // Set the CPU player
  }, []);

  // Function to handle click on the board
  const handleClick = useCallback(
    async (index) => {
      if (winner || board[index] !== null) return; // If there's a winner or the selected square is already filled, return
      const newBoard = [...board]; // Copy the current board
      newBoard[index] = player; // Set the selected square to the current player
      setBoard(newBoard); // Update the board state
      const isWinnerFound = checkWinner(newBoard, player); // Check if there's a winner after the current move
      if (isWinnerFound) return; // If there's a winner, return
      setLoading(true); // Set loading state while CPU is making a move
      await makeComputerMove(newBoard); // Make a move for the CPU player
      setLoading(false); // Reset loading state after CPU move
    },
    [board, player, winner]
  );

  // Function to make a move for the CPU player
  const makeComputerMove = useCallback(
    async (board) => {
      const response = await fetch(
        "https://hiring-react-assignment.vercel.app/api/bot",
        {
          method: "POST",
          body: JSON.stringify(board),
        }
      );
      const data = await response.json();
      const computerMove = data;
      const newBoard = [...board];
      newBoard[computerMove] = cpuPlayer;
      setBoard(newBoard);
      checkWinner(newBoard, cpuPlayer);
    },
    [cpuPlayer]
  );

  // Function to check if there's a winner
  const checkWinner = useCallback((board, currentPlayer) => {
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(currentPlayer); // Set the winner
        setWinningSequence(winningCombos[i]);
        return true;
      }
    }
    if (board.every((square) => square !== null)) {
      setWinner("draw"); // Set the winner as "draw" if all squares are filled
      return true;
    }
    return false; // Return false if there's no winner
  }, []);

  // Function to start a new game
  const handleNewGame = useCallback(() => {
    setBoard(Array(9).fill(null)); // Reset the board
    setWinner(null); // Reset the winner
    setPlayer(null); // Reset the player
    setCpuPlayer(null); // Reset the CPU player
    setWinningSequence([]); // Reset winning sequence
    setLoading(false); //Resets load
  }, []);

  // Render the game
  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      {/* Render player selection buttons if player is not selected */}
      {!player && (
        <div className="select-player">
          <button onClick={() => handlePlayerSelect("X")}>Select X</button>
          <button onClick={() => handlePlayerSelect("O")}>Select O</button>
        </div>
      )}
      {/* Render the board and winner message if player is selected */}
      {player && (
        <>
          {/* Conditionally apply the disable-pointer-events class */}
          <div className={loading ? "disable-pointer-events" : ""}>
            <Board
              board={board}
              handleClick={handleClick}
              winningSequence={winningSequence}
            />
          </div>
          {/* Render the Board component */}
          {/* Render the winner message if there's a winner */}
          {winner && (
            <div>
              <div className="winner">
                {winner} {winner !== "draw" ? "wins!" : ""}
              </div>
              <div className="new-game">
                <button onClick={handleNewGame}>New Game</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default Game;
