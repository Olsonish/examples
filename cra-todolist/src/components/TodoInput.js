import React from 'react';
import { Button } from 'reactstrap';
import { IoIosAdd } from 'react-icons/io';

class TodoInput extends React.Component {

  constructor() {
    super();
    this.state = {
      todo: '',
      validInput: false
    }
  }

  render() {
    return (
      <div className="todoInputContainer">
        <form onSubmit={(e) => this.submitTodo(e)}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <Button type="submit"><IoIosAdd></IoIosAdd></Button>
            </div>
            <input id="newTodoInput" type="text" className="form-control" placeholder=""
              aria-label="" onChange={(e) => this.todoInputChanged(e)}></input>
          </div>
        </form>
      </div>
    );
  }

  todoInputChanged = (e) => {
    this.setState({
      todo: e.target.value,
      validInput: (e) => { return e.target.value !== ''; }
    });
  }
  submitTodo = (e) => {
    e.preventDefault();
    const elInput = document.getElementById('newTodoInput');
    if (this.state.validInput && elInput.value !== "") {
      this.props.addTodoItemFn(this.state.todo);
      elInput.value = '';
    }
  }
}

export default TodoInput;
