
import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Square from './Square';

class Board extends React.Component {
  renderRow(row, rowIndex) {
    return (
      <Row className={"row" + (rowIndex + 1)} key={rowIndex}>
        {row.map((_cell, _colIndex) => this.renderCol(_colIndex, rowIndex))}
      </Row>
    );
  }
  renderCol(cellIndex, rowIndex) {
    return (
      <Col xs={4} className={"col-" + cellIndex} key={cellIndex}>
        <Square square={this.props.board[rowIndex][cellIndex]}
          rowIndex={rowIndex} cellIndex={cellIndex}
          squareClickFn={(square) => this.props.squareClickFn(square)}/>
      </Col>
    );
  }
  render() {
    return (
      <Grid className="Board">
        {this.props.board.map((_row, _rowIndex) => this.renderRow(_row, _rowIndex))}
      </Grid>
    );
  }
}
export default Board;
