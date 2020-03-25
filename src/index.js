import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteTodos = this.handleDeleteTodos.bind(this);
    this.state = {
      todos: ['zadanie','zadanie']
    };
  }
  handleDeleteTodos() {
    this.setState(() => ({ todos: [] }));
  }

  render() {
    const title = 'Lista zadań:';

    return (
      <div className="container">
        <Header title={title} />
        <AddOption />
        <Options
          todos={this.state.todos}
          hasTodos={this.state.todos.length > 0}
          handleDeleteTodos={this.handleDeleteTodos}
        />
        <Filter />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}
class AddOption extends React.Component {
  handleAddOption(e) {
    e.preventDefault();

    const todo = e.target.elements.todo.value.trim();

    if (todo) {
      alert(todo);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="todo" placeholder={'add your todo...'} />
          <button>Dodaj</button>
        </form>
      </div>
    );
  }
}

class Options extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleRemoveAll = this.handleRemoveAll.bind(this);
//   }

//   handleRemoveAll() {
//     console.log(this.props.options);
//   }

  render() {
    return (
      <div>
        Liczba zadań: {this.props.todos.length}
        {this.props.todos.map(todo => (
          <Option key={todo} optionText={todo} />
        ))}
        <button onClick={this.props.handleDeleteTodos} disabled={!this.props.hasTodos}>
          Usuń wszystko
        </button>
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return <div> {this.props.optionText}</div>;
  }
}

class Filter extends React.Component {
  render() {
    return <div> Filter</div>;
  }
}

ReactDOM.render(<TodoApp />, document.querySelector('#root'));
