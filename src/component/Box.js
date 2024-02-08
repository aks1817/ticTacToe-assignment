import React from "react";

const Box = React.memo(({ value, onClick }) => {
  return (
    <button className="box" onClick={onClick}>
      {value}
    </button>
  );
});

export default Box;
