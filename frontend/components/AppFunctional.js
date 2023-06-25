import React, { useState } from 'react'
import axios from 'axios';


const URL = "http://localhost:9000/api/result";

const initialValues = {
  initialY: '2',
  initialX: '2',
  initialIndex: 4,
  initialMessage: '',
  initialEmail: '',
  initialSteps: 0
};

const gridArr = [0,1,2,3,4,5,6,7,8];

export default function AppFunctional(props) {
  const [values, setValues] = useState(initialValues);
  const [message, setMessage] = useState(initialValues.initialMessage);
  const [email, setEmail] = useState(initialValues.initialEmail);
  const [steps, setSteps] = useState(initialValues.initialSteps);
  const [index, setIndex] = useState(initialValues.initialIndex);
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    let xCoord = '2';
    let yCoord = '2';
    gridArr.forEach(idx => { 
      if(idx % 3 === 0) xCoord = '1';
      else if(idx === 2 || idx === 5 || idx === 8) xCoord = '3';
    })
    gridArr.forEach(idx => {
      if(idx <= 3 && idx <= 5 ) yCoord = '1';
      else if(idx >= 6 && idx <= 8) yCoord = '3';
    })
    console.log(`(${xCoord}, ${yCoord})`);
    return `(${xCoord}, ${yCoord})`;
  }

  function reset() {
    setValues(initialValues);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    axios.post(URL, {
      x: 2,
      y: 2,
      steps: 5,
      email: email
    })
    .then((res) => {
      setMessage(res.data.message);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setValues(initialValues);
    })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {getXY()}</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {
          gridArr.map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
