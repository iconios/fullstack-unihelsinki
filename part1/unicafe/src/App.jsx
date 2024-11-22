import Button from "./Button.jsx";
import Statistics from "./Statistics.jsx"
import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function handleGoodClick() {
    setGood(good + 1);
  }

  function handleBadClick() {
    setBad(bad + 1);
  }

  function handleNeutralClick() {
    setNeutral(neutral + 1);
  }

  return (
    
    <>
      <h1>Give Feedback</h1>
      <Button name="Good" onClick={handleGoodClick}/>
      <Button name="Neutral" onClick={handleNeutralClick} />
      <Button name="Bad" onClick={handleBadClick} />
      <br />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
