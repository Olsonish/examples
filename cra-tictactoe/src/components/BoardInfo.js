
import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { IoMdClose, IoMdRadioButtonOff } from "react-icons/io";
import "./BoardInfo.css";

class BoardInfo extends React.Component {
  render() {
    const { nextPlayer, winner } = this.props;
    return (
      <Grid className="BoardInfo">
        <Row className="nextPlayerRow">
          <Col xs={6}>
            <div className="nextPlayer">Next Player</div>
          </Col>
          <Col xs={6}>
            <div className="nextPlayerIcon">{this.getIcon(nextPlayer)}</div>
          </Col>
        </Row>
        <Row className="winnerRow">
          <Col xs={6}>Winner:</Col>
          <Col xs={6}>{winner ? 'Winner found!' : 'No winner yet!'}</Col>
        </Row>
      </Grid>
    )
  }

  getIcon(value) {
    switch (value) {
      case 'X': return (<IoMdClose />);
      case 'O': return (<IoMdRadioButtonOff />);
      default: return ('');
    }
  }
}

export default BoardInfo;
