import React from "react";

// Box component
const Box = React.memo(({ value, onClick }) => {
  // Render a button representing a box on the tic-tac-toe board
  return (
    <button className="box" onClick={onClick}>
      {value} {/* Display the value of the box */}
    </button>
  );
});

export default Box;
