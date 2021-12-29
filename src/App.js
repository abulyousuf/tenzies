import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";
import "./style.css";

const App = () => {
  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };

  const allNewDice = () => {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }

    return newDice;
  };

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  // syncing 2 internal states together
  useEffect(() => {
    console.log("Dice state changed!");
  }, [dice]);

  const rollDice = () => {
    setDice(oldDice =>
      oldDice.map(die => (die.isHeld ? die : generateNewDie()))
    );
  };

  const holdDice = id => {
    setDice(oldDice =>
      oldDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
};

export default App;
