import React, { useState } from 'react'
import axios from 'axios';


const URL = "http://localhost:9000/api/result";

  const initialIndex = 4;
  const initialMessage = '';
  const initialEmail = '';
  const initialSteps = 0;

const gridArr = [0,1,2,3,4,5,6,7,8];

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY(b, x, y) {
    if(b === 0) {
      x = 1;
      y = 1;
    } else if(b === 1) {
      x = 2;
      y = 1;
    } else if(b === 2) {
      x = 3;
      y = 1;
    } else if(b === 3) {
      x = 1;
      y = 2;
    } else if(b === 4) {
      x = 2;
      y = 2;
    } else if(b === 5) {
      x = 3;
      y = 2;
    } else if(b === 6) {
      x = 1;
      y = 3;
    } else if(b === 7) {
      x = 2;
      y = 3;
    } else if(b === 8) {
      x = 3;
      y = 3;
    }
    return `(${x}, ${y})`;
  }

  function reset() {
    setMessage(initialMessage);
    setIndex(initialIndex);
    setEmail(initialEmail);
    setSteps(initialSteps);
  }

  function getNextIndex(direction) {
      if(index % 3 === 0 && direction === "left") {
      setMessage(`You can't go ${direction}`);
      return index;
    } else if(index >= 0 && index <= 2 && direction === "up") {
      setMessage(`You can't go ${direction}`);
      return index;
    } else if(index >= 6 && index <= 8 && direction === "down") {
      setMessage(`You can't go ${direction}`);
      return index;
    } else if((index === 2 || index === 5 || index === 8) && direction === "right") {
      setMessage(`You can't go ${direction}`);
      return index;
    } else if(direction === "left") {
      setIndex(index - 1);
      setSteps(steps + 1);
    } else if(direction === "up") {
      setIndex(index - 3);
      setSteps(steps + 1);
    } else if(direction === "down") {
      setIndex(index + 3);
      setSteps(steps + 1);
    } else if(direction === "right") {
      setIndex(index + 1);
      setSteps(steps + 1);
    }
    return index;
   
   // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    getNextIndex(evt.target.id);
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    if(email === '') {
      setMessage("Ouch: email is required");
    }
    axios.post(URL, {
      x: 2,
      y: 2,
      steps: steps,
      email: email
    })
    .then((res) => {
      setMessage(res.data.message);
      setIndex(initialIndex);
      setEmail(initialEmail);
      setSteps(initialSteps);
    })
    .catch((err) => {
      console.error(err);
    })
  }
  

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXY(index)}</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {
          gridArr.map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} id="email" type="email" placeholder="type email" value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
