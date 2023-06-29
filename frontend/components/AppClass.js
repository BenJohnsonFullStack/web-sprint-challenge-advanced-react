import React from 'react'
import axios from 'axios'

const URL = "http://localhost:9000/api/result";

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = () => {
    let x, y;
    if(this.state.index === 0) {
      x = 1;
      y = 1;
    } else if(this.state.index === 1) {
      x = 2;
      y = 1;
    } else if(this.state.index === 2) {
      x = 3;
      y = 1;
    } else if(this.state.index === 3) {
      x = 1;
      y = 2;
    } else if(this.state.index === 4) {
      x = 2;
      y = 2;
    } else if(this.state.index === 5) {
      x = 3;
      y = 2;
    } else if(this.state.index === 6) {
      x = 1;
      y = 3;
    } else if(this.state.index === 7) {
      x = 2;
      y = 3;
    } else if(this.state.index === 8) {
      x = 3;
      y = 3;
    }
    return [x,y];
  }

  getXYMessage() {
    let coordinates = this.getXY();
    const [ x, y ] = coordinates;
    return `Coordinates (${x}, ${y})`;
  }

  reset = () => {
    this.setState(initialState);
    console.log(this.state);
  }

  getNextIndex = (direction) => {
    if(this.state.index % 3 === 0 && direction === "left") {
      this.setState({ message: `You can't go ${direction}` });
      return this.state.index;
    } else if(this.state.index >= 0 && this.state.index <= 2 && direction === "up") {
      this.setState({ message: `You can't go ${direction}` });
      return this.state.index;
    } else if(this.state.index >= 6 && this.state.index <= 8 && direction === "down") {
      this.setState({ message: `You can't go ${direction}` });
      return this.state.index;
    } else if((this.state.index === 2 || this.state.index === 5 || this.state.index === 8) && direction === "right") {
      this.setState({ message: `You can't go ${direction}` });
      return this.state.index;
    } else if(direction === "left") {
      this.setState({ index: this.state.index - 1 });
      this.setState({ steps: this.state.steps + 1 });
    } else if(direction === "up") {
      this.setState({ index: this.state.index - 3 });
      this.setState({ steps: this.state.steps + 1 });
    } else if(direction === "down") {
      this.setState({ index: this.state.index + 3 });
      this.setState({ steps: this.state.steps + 1 });
    } else if(direction === "right") {
      this.setState({ index: this.state.index + 1 });
      this.setState({ steps: this.state.steps + 1 });
    }
    return this.state.index;
  }

  move = (evt) => {
    this.getNextIndex(evt.target.id);
  }

  onChange = (evt) => {
    this.setState({ ...this.state, email: evt.target.value });
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    const coordinates = this.getXY();
    const [ x, y ] = coordinates;
    if(this.state.email === '') {
      this.setState({ message: "Ouch: email is required" });
    }
    
    axios.post(URL, {
      x: x,
      y: y,
      steps: this.state.steps,
      email: this.state.email
    })
    .then((res) => {
      this.setState({ message: res.data.message });
      this.setState({ email: initialEmail });
    })
    .catch((err) => {
      this.setState({ message: err.response.data.message });
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            [0,1,2,3,4,5,6,7,8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button onClick={this.reset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email" value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
