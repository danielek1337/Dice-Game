import React from "react";

export default function Scoreboard({ time, rolls }) {
  const calculatedTime = (time / 100).toFixed(2);

  return (
    <>
      <ul>
        <li>
          Rolls: <b>{rolls}</b> Time: <b>{calculatedTime} s</b>
        </li>
      </ul>
    </>
  );
}
