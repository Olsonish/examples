
import React from 'react';
import './Square.css';
import { IoMdClose, IoMdRadioButtonOff } from "react-icons/io";

class Square extends React.Component {
  render() {
    const { index, value, winner } = this.props.square;
    return (
      <div onClick={this.handleClick} className={"Square square-" + (index + 1)
        + (value ? "" : " empty") + (winner ? ' winner' : '')}>
        <div className="valueArea">{this.getIcon(value)}</div>
      </div>
    );
  }
  handleClick = () => {
    console.log('\n----');
    console.log('Square.js handling the click')
    const { square, rowIndex, cellIndex, squareClickFn } = this.props;
    if (this.props.square.value) {
      return;
    } else {
      console.log('Square.js passing click to Game.js squareClickFn');
      squareClickFn(square, rowIndex, cellIndex);
    }
  }
  getIcon(value) {
    switch(value) {
      case 'X':
        return (<IoMdClose className="valueIcon" />);
      case 'O':
        return (<IoMdRadioButtonOff className="valueIcon" />);
      default:
        return('');
    }
  }
}

export default Square;
