import React from "react";

// Box component
const Box = React.memo(({ value, onClick, isWinningBox }) => {
  // Render a button representing a box on the tic-tac-toe board
  const boxClass = isWinningBox ? "box winning-box" : "box";
  return (
    <button className={boxClass} onClick={onClick}>
      {value} {/* Display the value of the box */}
    </button>
  );
});

export default Box;
