import React, { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [player, setPlayer] = useState(null);
  const [cpuPlayer, setCpuPlayer] = useState(null);

  const handlePlayerSelect = (selectedSymbol) => {
    setPlayer(selectedSymbol);
    if (selectedSymbol === "X") {
      setCpuPlayer("0");
    } else {
      setCpuPlayer("X");
    }
  };

  const handleClick = async (index) => {
    if (winner || board[index] !== null) return;
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    const isWinnerFound = checkWinner(newBoard, player);
    if (isWinnerFound) {
      return;
    }
    await makeComputerMove(newBoard);
  };

  const makeComputerMove = async (board) => {
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
    checkWinner(newBoard, player);
  };

  const checkWinner = (board, currentPlayer) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(currentPlayer);
        return true;
      }
    }

    if (board.every((square) => square !== null)) {
      setWinner("draw");
      return true;
    }

    return false;
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      {!player && (
        <div className="select-player">
          <button onClick={() => handlePlayerSelect("X")}>Select X</button>
          <button onClick={() => handlePlayerSelect("O")}>Select O</button>
        </div>
      )}
      {player && (
        <>
          <Board board={board} handleClick={handleClick} />
          {winner && (
            <div className="winner">
              {winner} {winner !== "draw" ? "wins!" : ""}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Game;
