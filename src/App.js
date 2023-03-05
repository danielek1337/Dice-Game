import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  const [rollCount, setRollCount] = React.useState(0);

  //stoper

  const [time, setTime] = React.useState(0);

  const seconds = Math.floor((time % 6000) / 100);

  const [isRunning, setIsRunning] = React.useState(true);

  //stoper

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
      setTenzies(false);
      setDice(allNewDice());
      setRollCount(0);
      //setting stoper
      setTime(0);
    } else {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld === true ? die : generateNewDie();
        })
      );
      setRollCount(rollCount + 1);
    }
  }

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
    if (!tenzies) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [tenzies, time]);

  //stoper

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
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
  );
}

export default App;
