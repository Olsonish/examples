
import React from 'react';
import Board from './Board';
import BoardInfo from './BoardInfo';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xisNext: true,
      winner: false,
      winningCombos: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // accross lines
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // down lines
        [0, 4, 8],
        [2, 4, 6] // diagnol lines
      ]
    };
    this.state.gridSize = Math.sqrt(this.state.squares.length);
    this.state.board = this.getNewBoard();
  }

  // to return either the winning combo array [0,1,2] or false
  findWinningCombo = board => {
    console.log("Game.js finding a winner");
    let out;
    const squares = board.reduce((a, b) => [...a, ...b], []);
    const winners = this.state.winningCombos.map((_winningCombo, _index) => {
      const [a, b, c] = _winningCombo;
      if (
        squares[a].value &&
        squares[a].value === squares[b].value &&
        squares[a].value === squares[c].value
      ) {
        return [a, b, c];
      }
      return false;
    });
    winners.forEach(winner => {
      if (winner) {
        out = winner;
      }
    });
    return out;
  };

  setWinnerToBoard = (board, combo) => {
    console.log("Game.js setting winning combo to  board: ", combo);
    board.forEach(row => {
      row.forEach(square => {
        combo.forEach((squareIndex) => {
          if (squareIndex === square.index) {
            square.winner = true;
          }
        })
      });
    });
    return board;
  }
  squareClickFn = square => {
    let board = this.state.board.slice();
    if (this.state.winner) {
      console.log('Game.js already found a winner before this click, resetting the board');
      this.setState({
        board: this.getNewBoard(),
        winner: false,
        xisNext: true
      });
      return;
    }
    const rowIndex = this.getRowIndex(square.index);
    const colIndex = this.getColIndex(square.index);
    if (board[rowIndex][colIndex].value) {
      return; // if a value is already present do nothing
    }
    // if there is no value (X or O) set for the clicked square set one
    if (!square.value) {
      console.log("Game.js setting the square value");
      board[rowIndex][colIndex].value = this.state.xisNext ? "X" : "O";
    }
    // figure out if this click wins the game
    const winningCombo = this.findWinningCombo(board);
    if (winningCombo) {
      board = this.setWinnerToBoard(board, winningCombo);
    }
    // update the new board state
    this.setState({
      board: board,
      xisNext: !this.state.xisNext,
      winner: winningCombo ? true : false,
      winningCombo: winningCombo ? winningCombo : null
    });
  };
  getRowIndex(index) {
    return Math.floor(index / this.state.gridSize);
  }
  getColIndex(index) {
    return index - this.state.gridSize * this.getRowIndex(index);
  }
  getNewBoard() {
    const board = [];
    for (let row = 0; row < this.state.gridSize; row++) {
      board[row] = Array(this.state.gridSize);
      for (let col = 0; col < this.state.gridSize; col++) {
        board[row][col] = [];
      }
    }
    this.state.squares.map((_square, _i) =>
      (board[this.getRowIndex(_i)][this.getColIndex(_i)] = {
        value: _square,
        index: _i,
        winner: false
      })
    );
    return board;
  }

  render() {
    return (
      <div className="Game">
        <Board squareClickFn={this.squareClickFn} board={this.state.board} />
        <BoardInfo
          nextPlayer={this.state.xisNext ? "X" : "O"}
          winner={this.state.winner}
        />
      </div>
    );
  }
}

export default Game;
