import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react';
import './App.css'
import Die from './components/Die'
import Confetti from 'react-confetti';

function App() {

  // Real Dots 
  // Track number of rolls 
  // Track time to win 
  // Save best to localStorage

  const [dices, setDices] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect( () => {
    
    const allHeld = dices.every( die => die.isHeld)
    const firstValue = dices[0].value
    const allSameValue = dices.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
    }

  },[dices])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

  
  function allNewDice() {
    const newDices = [];
    
    for (let i = 0; i < 10; i++) {
      newDices.push( generateNewDie() );
    }
    
    return newDices;
    
  }


  function Roll(){
    const NewDices = allNewDice()
    if (tenzies === false){
      setDices(oldDice => oldDice.map(die => {
          return die.isHeld ?
          die :
          generateNewDie()
      }))
    }else{
      setTenzies(false)
      setDices(NewDices)
    }
  }

  function toggleDice(id) {
    
      setDices(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  
  }

  

  
  const diceElements = dices.map(dice => <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} id={dice.id} toggleDice={toggleDice}/>)


  
  
  return (
  
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <h2 className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h2>
        <div className='die--container'>
          {diceElements}
        </div>
        <button className='diceRoll--button' onClick={Roll}>{tenzies? "Play Again?" : "Roll"}</button>
      </main>
    
  )
}

export default App
