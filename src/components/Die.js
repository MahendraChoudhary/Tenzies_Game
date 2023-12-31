import React from 'react'

export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <div 
            className="die-face"   
            style={styles} 
            // onClick={() => props.holdDice(props.id)}
            onClick={props.holdDice}
        >
            <h1 className="die-num">{props.value}</h1>
        </div>
    )
}