import React from "react";

const Cell = ({ coords, isAlive, onClick }) => {
  return (
    <div
      className={`cell ${isAlive ? "alive" : "dead"}`}
      onClick={() => onClick(coords)}
    ></div>
  );
};

export default Cell;
