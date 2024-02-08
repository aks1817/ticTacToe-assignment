import React, { useCallback } from "react";
import Box from "./Box";

const Board = React.memo(({ board, handleClick }) => {
  const onBoxClick = useCallback(
    (index) => {
      handleClick(index);
    },
    [handleClick]
  );

  return (
    <div className="board">
      {board.map((value, index) => (
        <Box key={index} value={value} onClick={() => onBoxClick(index)} />
      ))}
    </div>
  );
});

export default Board;
