import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white',
  'border': "none"
}

const squareStyleActive = {
  width: "60px",
  height: "60px",
  backgroundColor: "limegreen",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
  border: "none"
};



const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

//individual squares
function Square({style, randomize, points, timer}) {
//function Square({style, randomize, points, setPoints, timer}) {

  //Button disabler
  let isOn = false

  //onClick function
  function squareClick() {
    //setPoints(points + 1)
    points.current = points.current + 1
    style = squareStyle
    isOn = false
  }

  //array of boolean, index is part of square

  //condition for type of square
  if ( randomize === 1) {
    style = squareStyleActive
    isOn = false
  } else {
    style = squareStyle
    isOn = true
  }

  //reset if 0 or 10
  if ( timer === 0 || timer === 10) {
    style = squareStyle
    isOn = true
  }

  return (
    <button
      onClick={squareClick}
      className="square"
      style={style}
      disabled={isOn}
      >  
    </button>
  );
}

//Random function return 0 or 1 for 50% chance
function randomizer() {
  return Math.floor(Math.random() * 2)
}

function Board() {

  //useRef
  let pointCheck = useRef(0)
  //Hooks used
  //points
  //let [points, setPoints] = useState(0)
  //timer
  let [timer, setTimer] = useState(10)
  //message
  let [message, setMessage] = useState("")
  //disable button
  const [isDisabled, setDisabled] = useState(false)

  //function to start the game
  function start() {
    //check to see clicked
    console.log("did I Run")

    //reset points
    //setPoints(0)

    //start countdown if at 10, or set to 10 then countdown
    if (timer === 10 ) {
      setTimer( timer - 1)
    } else {
      setTimer(timer = 10)
      setTimeout(() => {
        setTimer(timer - 1)
      }, 1000)
    }

    //turn off button on countdown
    setDisabled(true)
  }

  //Useeffect for changes
  useEffect(() => {
    //actual countdown
    if ( timer !== 0 && timer !== 10) {
      setTimeout(() => {
        setTimer( timer - 1)
      }, 1000)
    }

    //if timer 10 or 0, turn button back on
    if ( timer === 0 || timer === 10) {
      setDisabled(false)

      //if it is 0 print out message Game Over
      if ( timer === 0) {
        setMessage("Game Over")
      } else {
        setMessage("")
      }
    }
  }, [timer])

  // points={points}
  // setPoints={setPoints}

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Points: <span>{pointCheck.current}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Time left: <span>{timer} secs</span></div>
      <button style={buttonStyle} onClick={start} disabled={isDisabled} >Start Game</button>
      <p>{message}</p>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square
            timer={timer}
            points={pointCheck.current}
            randomize={randomizer()}
          />
          <Square 
            timer={timer}
            points={pointCheck.current}
            randomize={randomizer()}
          />
          <Square 
            timer={timer}
            points={pointCheck.current}
            randomize={randomizer()}
          />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square 
            timer={timer}
            points={pointCheck.current}
            randomize={randomizer()}
          />
          <Square
            timer={timer}
            points={pointCheck.current}
            randomize={randomizer()} 
          />
          <Square 
            timer={timer}
            points={pointCheck.current}
            randomize={randomizer()}
          />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square 
            timer={timer}
            points={pointCheck.current}
            randomize={randomizer()}
          />
          <Square 
            timer={timer}
            points={pointCheck.current}
            randomize={randomizer()}
          />
          <Square 
            timer={timer}
            points={pointCheck.current}
            randomize={randomizer()}
          />
        </div>
      </div>
    </div>
  );
}

Board.defaultProps = {
  style: squareStyle,
  message: ""
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);