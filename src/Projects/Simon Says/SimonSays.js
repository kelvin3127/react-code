import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  backgroundColor: "#eee",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

const redWedge = {
  width: "60px",
  height: "60px",
  border: "3px red solid",
  backgroundColor: "red",
  borderRadius: " 60px 0 0 0",
  margin: "4px",
  opacity: 0.8,
  cursor: "pointer",
};

const blueWedge = {
  width: "60px",
  height: "60px",
  border: "3px blue solid",
  backgroundColor: "blue",
  borderRadius: " 0 60px 0 0",
  margin: "4px",
  opacity: 0.8,
  cursor: "pointer",
};

const greenWedge = {
  width: "60px",
  height: "60px",
  border: "3px green solid",
  backgroundColor: "green",
  borderRadius: " 0 0 0 60px",
  margin: "4px",
  opacity: 0.8,
  cursor: "pointer",
};

const orangeWedge = {
  width: "60px",
  height: "60px",
  border: "3px orange solid",
  backgroundColor: "orange",
  borderRadius: " 0 0 60px 0",
  margin: "4px",
  opacity: 0.8,
  cursor: "pointer",
};

const redWedgeActive = {
  width: "60px",
  height: "60px",
  border: "3px red solid",
  backgroundColor: "red",
  borderRadius: " 60px 0 0 0",
  margin: "4px",
  boxShadow: "0 0 10px red",
};

const blueWedgeActive = {
  width: "60px",
  height: "60px",
  border: "3px blue solid",
  backgroundColor: "blue",
  borderRadius: " 0 60px 0 0",
  margin: "4px",
  boxShadow: "0 0 10px blue",
};

const greenWedgeActive = {
  width: "60px",
  height: "60px",
  border: "3px green solid",
  backgroundColor: "green",
  borderRadius: " 0 0 0 60px",
  margin: "4px",
  boxShadow: "0 0 10px green",
};

const orangeWedgeActive = {
  width: "60px",
  height: "60px",
  border: "3px orange solid",
  backgroundColor: "orange",
  borderRadius: " 0 0 60px 0",
  margin: "4px",
  boxShadow: "0 0 10px orange",
};

function SimonSaysBoard() {

  let [red, setRed] = useState(redWedge)
  let [blue, setBlue] = useState(blueWedge)
  let [orange, setOrange] = useState(orangeWedge)
  let [green, setGreen] = useState(greenWedge)
  let [round, setRound] = useState(0)
  let [point, setPoint] = useState(0)
  let [simonArr, setSimonArr] = useState([])
  let [playArr, setPlayArr] = useState([])
  let [playMsg, setPlayMsg] = useState("")
  let [isDisabled, setIsDisabled] = useState(true)

  // pause for a given number of milliseconds (ms) before continuing execution, must be used in an async function and awaited. 1 second = 1000 ms
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //Set Game to default settings
  function resetGame() {
    setRound(0)
    setPoint(0)
    setPlayMsg("")
    setPlayArr([])
    setSimonArr([])
  }

  function resetColor() {
    setRed(redWedge)
    setBlue(blueWedge)
    setOrange(orangeWedge)
    setGreen(greenWedge)
  }

  async function color(color) {
    if ( color === "3") {
      setGreen(greenWedgeActive)
      await timeout(1000)
      resetColor()
    } else if ( color === "2" ) {
      setOrange(orangeWedgeActive)
      await timeout(1000)
      resetColor()
    } else if ( color === "1" ) {
      setBlue(blueWedgeActive)
      await timeout(1000)
      resetColor()
    } else {
      setRed(redWedgeActive)
      await timeout(1000)
      resetColor()
    }
  }

  function playerMsg() {
    let tempString = "Player Sequence: "
    for (let i = 0; i < playArr.length; i++) {
      if ( playArr[i] === "3") {
          tempString = tempString + "green "
        } else if ( playArr[i] === "2" ) {
          tempString = tempString + "orange "
        } else if ( playArr[i] === "1" ) {
          tempString = tempString + "blue "
        } else {
          tempString = tempString + "red "
        }
    }
    setPlayMsg(tempString)
  }
    
  async function flashColor(arr) {
    for (let i = 0; i < arr.length; i++) {
      color(arr[i])
      await timeout(1000)
    }
    console.log("Simon Colors: " + arr)
    setSimonArr(arr)
  }

  async function playClick(e) {
    color(e)
    await timeout(500)
    resetColor()
    player(e)
  }

  function player(clicked) {
    let tempArr = []
    for (let i = 0; i < playArr.length; i++) {
      tempArr.push(playArr[i])
    }
    tempArr.push(clicked)
    setPlayArr(tempArr)
    
  }

  function simon() {
    setIsDisabled(true)
    console.log("Round " + round)
    let tempArr = []
    for (let i = 0; i < simonArr.length; i++) {
      tempArr.push(simonArr[i])
    }
    if (tempArr.length < round) {
      tempArr.push(Math.floor(Math.random() * 4).toString())
    }
    flashColor(tempArr)
    setIsDisabled(false)
  }

  function calculate() {
    for (let i = 0; i < simonArr.length; i++) {
      if (simonArr[i] === playArr[i] ) {
        setPoint(point + 1)
      } else {
        return true
      }
    }
    setPlayArr([])
    return false
  }

  useEffect(() => {
    if (playArr.length > 0) {
      playerMsg()
    } 
  }, [playArr])

  useEffect(() => {
    if (round > 0 ) {
      simon()
    }
  }, [round])

  useEffect(() => {
    if (simonArr.length === playArr.length && playArr.length > 0) {
      if (calculate() === false) {
        setRound(round + 1)
        setPlayMsg("")
      } 
      if (calculate() === true) {
        setPoint("Game Over")
      }
    }
    
  }, [playArr])

  useEffect(()=> {
    if ( point === "Game Over") {
      setPlayMsg("Game Over, you clicked the wrong edge")
    }
    if ( playArr.length > simonArr) {
      alert("Error, Something went wrong, press \"Start Game\"")
    }
  }, [point, playArr])

  function startGame() {
    console.log("Start Game")
    if (round > 0) {
      resetGame()
    }
    setRound(1)
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Points: <span>{point}</span>
      </div>
      <button style={buttonStyle} onClick={() => startGame()}>Start Game</button>
      <div>{playMsg}</div>
      <div style={boardStyle}>
        <div style={{ display: "flex" }}>
          <button style={red} disabled={isDisabled} id="0" onClick={(e) => playClick(e.target.id)}/>
          <button style={blue} disabled={isDisabled} id="1" onClick={(e) => playClick(e.target.id)}/>
        </div>
        <div style={{ display: "flex" }}>
          <button style={green} disabled={isDisabled} id="3" onClick={(e) => playClick(e.target.id)}/>
          <button style={orange} disabled={isDisabled} id="2" onClick={(e) => playClick(e.target.id)}/>
        </div>
      </div>
    </div>
  );
}

function Game() {
  return <SimonSaysBoard />;
}

ReactDOM.render(<Game />, document.getElementById("root"));