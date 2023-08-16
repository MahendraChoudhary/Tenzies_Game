import React from 'react'
import Die from "./components/Die.js"
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App(){

    function generateNewDie(){
        return (
            {
                value: Math.ceil(Math.random()*6),
                isHeld: false, 
                id:nanoid()
            }
        )
    }

    function allNewDice(){
        const newArray = []
        for (let i=0; i<10; i++){
            newArray.push(generateNewDie())
        }
        return newArray
    }
    
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld === true)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => firstValue === die.value)

        if(allHeld && allSameValue){
            setTenzies(true)
            console.log("You have won!")
        }
    }, [dice])

    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
           return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    const newDiceElements = dice.map((die) => (
        <Die 
            value={die.value} 
            isHeld={die.isHeld} 
            key = {die.id}
            // id = {die.id}
            // holdDice={holdDice} 
            holdDice={() => holdDice(die.id)}
        />)
    )

    function rollDice(){
        if (!tenzies){
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld === true ? die : generateNewDie()
            }))
        }
        else{
            setTenzies(false)
            setDice(allNewDice())
        }
    }

    return(
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are same. Click each die to freeze it at it's current value between each rolls.</p>
            <div className="dice-container">
                {newDiceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies === true ? "Reset" : "Roll"}</button>
        </main>
    )
}