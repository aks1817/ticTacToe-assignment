import React from "react";
import Box from "./Box";

const Board = ({ board, handleClick }) => {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Box key={index} value={value} onClick={() => handleClick(index)} />
      ))}
    </div>
  );
};

export default Board;
