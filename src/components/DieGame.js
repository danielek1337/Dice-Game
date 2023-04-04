import React from "react";
import Die from "./Die";
import Scoreboard from "./Scoreboard";
import { nanoid } from "nanoid";

export default function DieGame() {
  const [dice, setDice] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  const [rollCount, setRollCount] = React.useState(0);

  //stoper

  const [firstRoll, setFirstRoll] = React.useState(false);

  const [time, setTime] = React.useState(0);

  const seconds = Math.floor((time % 6000) / 100);

  //stoper

  //scoreboard

  const [scores, setScores] = React.useState(
    JSON.parse(localStorage.getItem("scores")) || []
  );

  React.useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  //scoreboard

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    let array = [];
    for (let i = 0; i < 10; i++) {
      array.push(generateNewDie());
    }

    return array;
  }

  function rollDice() {
    if (tenzies) {
      setScores((prevScore) => [
        ...prevScore,
        {
          rolls: rollCount,
          time: time,
          score: rollCount * time,
        },
      ]);
      setTenzies(false);
      setDice(allNewDice());
      setRollCount(0);
      //setting stoper states
      setTime(0);
      setFirstRoll(false);
      //gathering score
    } else {
      setFirstRoll(true);
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld === true ? die : generateNewDie();
        })
      );
      setRollCount(rollCount + 1);
    }
  }

  console.log(scores);
  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      })
    );
  }

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allValues = dice.every((die) => die.value === firstValue);
    if (allHeld && allValues) {
      setTenzies(true);
      console.log("you won");
    }
  }, [dice]);

  //stoper

  React.useEffect(() => {
    let intervalId;
    if (!tenzies && firstRoll) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [tenzies, time, firstRoll]);

  //stoper

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  // sorting scores function
  function compare(a, b) {
    if (a.score < b.score) {
      return -1;
    }
    if (a.score > b.score) {
      return 1;
    }
    return 0;
  }
  //end of sorting scores function
  //sorting scores array by score property
  scores.sort(compare);
  const scoreElements = scores.map((score) => (
    <Scoreboard
      time={score.time}
      rolls={score.rolls}
      key={score.time}
      score={score.score}
    />
  ));

  return (
    <>
      <div className="container">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="die-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        <p className="roll-counter">
          Times rolled: <b>{rollCount}</b>
        </p>
        <p>{seconds.toString().padStart(2, "0")}</p>
      </div>

      <div className="scoreboard-container">
        <h2>Your scores</h2>
        {scoreElements}
      </div>
    </>
  );
}
