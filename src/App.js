import React, { useState } from "react";
import Die from "./Die";
import "./style.css";

const App = () => {
  const allNewDice = () => {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push({ value: Math.ceil(Math.random() * 6), isHeld: false });
    }

    return newDice;
  };

  const [dice, setDice] = useState(allNewDice());

  const rollDice = () => {
    setDice(allNewDice());
  };

  const diceElements = dice.map((die, index) => (
    <Die key={index} value={die.value} />
  ));

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
};

export default App;
