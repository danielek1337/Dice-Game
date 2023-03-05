import React from "react";

export default function Scoreboard(props) {
  const time = (props.time / 100).toFixed(2);

  return (
    <>
      <ul>
        <li>
          Rolls:{props.rolls} Time:{time} s
        </li>
      </ul>
    </>
  );
}
