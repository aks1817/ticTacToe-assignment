import React from "react";

const Box = ({ value, onClick }) => {
  return (
    <button className="box" onClick={onClick}>
      {value}
    </button>
  );
};

export default Box;
