import React, { useCallback } from "react";
import Box from "./Box";

// Board component
const Board = React.memo(({ board, handleClick }) => {
  // Memoized callback function for handling box click events
  const onBoxClick = useCallback(
    (index) => {
      handleClick(index); // Invoke the handleClick function with the index of the clicked box
    },
    [handleClick] // Dependency array includes handleClick
  );

  // Render the board
  return (
    <div className="board">
      {/* Map over each value in the board array */}
      {board.map((value, index) => (
        // Render Box component for each value in the board array
        <Box key={index} value={value} onClick={() => onBoxClick(index)} />
      ))}
    </div>
  );
});

export default Board;
