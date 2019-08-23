import React from 'react';
import { IoMdCheckmark } from 'react-icons/io';

import { Grid, Row, Col } from 'react-flexbox-grid';

import "./TodoItem.css";

class TodoItem extends React.Component {
  render() {
    return (
      <div className={"row todoItem" + (this.props.todo.done ? ' done' : '')}
        onClick={this.toggleTodo}>
        <Grid fluid>
          <Row>
            <Col xs={10} md={9}>{this.props.todo.text}</Col>
            <Col xs={2} md={3} className="actionCol">
              <IoMdCheckmark className="doneButton"></IoMdCheckmark>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

  toggleTodo = () => this.props.updateTodoItem(this.props.todo);
}

export default TodoItem;
