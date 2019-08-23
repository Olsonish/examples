import React from 'react';
import './App.css';

import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';



class App extends React.Component {

  constructor () {
    super();
    this.state = {
      todos: []
    }
  }

  render() {
    return (
      <div className="appContainer">
        <center><h1 className="appTitle">Todo List:</h1></center>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <TodoInput addTodoItemFn={ this.addTodoItem }></TodoInput>
            <hr></hr>
            <TodoList todos={this.state.todos}
              updateTodoItemFn={this.updateTodoItem}></TodoList>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    const todos = localStorage.getItem('todos');
    if (todos) {
      this.setState({ todos: JSON.parse(todos) });
    } else {
      console.log('no todos');
    }
  }

  addTodoItem = async (todo) => {
    await this.setState({
      todos: [...this.state.todos, { text: todo, done: false }]
    });
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
    console.log(localStorage.getItem('todos'));
  }

  updateTodoItem = (todo) => {
    const newTodos = this.state.todos.map((_todo) => {
        return (todo === _todo) ? { text: todo.text, done: !todo.done } : _todo;
      });
    this.setState({ todos: newTodos });
  }

}

export default App;
