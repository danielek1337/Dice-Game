import React from "react";

export default function Die(props) {
  const style = { backgroundColor: props.isHeld ? "#59E391" : "white" };
  return (
    <div style={style} className="single-dice" onClick={props.holdDice}>
      <h2>{props.value}</h2>
    </div>
  );
}
