import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';

class Todo extends React.Component {
  render() {
    const title = 'Lista zadań:';
    const todos = ['zadanie 1', 'zadanie 2', 'zadanie 3'];

    return (
      <div className="container">
        <Header title={title} />
        <AddOption />
        <Options todos={todos} />
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
  render() {
    return (
      <div>
        Liczba zadań: {this.props.todos.length}
        {this.props.todos.map(todo => (
          <Option key={todo} optionText={todo} />
        ))}
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

ReactDOM.render(<Todo />, document.querySelector('#root'));
