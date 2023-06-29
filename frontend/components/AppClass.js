import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const URL = "http://localhost:9000/api/result";

const gridArr = [0,1,2,3,4,5,6,7,8];

export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    }
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = (b, x, y) => {
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

  reset = () => {
    this.setState(this.state.initialMessage);
    this.setState(this.state.initialIndex);
    this.setState(this.state.initialEmail);
    this.setState(this.state.initialSteps);
  }

  getNextIndex = (direction) => {
    if(this.state.index % 3 === 0 && direction === "left") {
      this.setState({ ...this.state, message: `You can't go ${direction}` });
      return this.state.index;
    } else if(this.state.index >= 0 && this.state.index <= 2 && direction === "up") {
      this.setState({ ...this.state, message: `You can't go ${direction}` });
      return this.state.index;
    } else if(this.state.index >= 6 && this.state.index <= 8 && direction === "down") {
      this.setState({ ...this.state, message: `You can't go ${direction}` });
      return this.state.index;
    } else if((this.state.index === 2 || this.state.index === 5 || this.state.index === 8) && direction === "right") {
      this.setState({ ...this.state, message: `You can't go ${direction}` });
      return this.state.index;
    } else if(direction === "left") {
      this.setState({ ...this.state, index: this.state.index - 1 });
      this.setState({ ...this.state, steps: this.state.steps + 1 });
    } else if(direction === "up") {
      this.setState({ ...this.state, message: this.state.index - 3 });
      this.setState({ ...this.state, steps: this.state.steps + 1 });
    } else if(direction === "down") {
      this.setState({ ...this.state, index: this.state.index + 3 });
      this.setState({ ...this.state, steps: this.state.steps + 1 });
    } else if(direction === "right") {
      this.setState({ ...this.state, index: this.state.index + 1 });
      this.setState({ ...this.state, steps: this.state.steps + 1 });
    }
    return this.state.index;
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    axios.post(URL, {
      x: 2,
      y: 2,
      steps: this.state.steps,
      email: this.state.email
    })
    .then((res) => {
      this.setState(res.data.message);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      this.setState({ message: this.state.initialMessage });
      this.setState({ index: this.state.initialIndex });
      this.setState({ email: this.state.initialEmail });
      this.setState({ steps: this.state.initialSteps });
    })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getXY(this.state.index)}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            gridArr.map(idx => (
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
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
