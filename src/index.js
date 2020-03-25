import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteTodos = this.handleDeleteTodos.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      todos: []
    };
  }
  handleDeleteTodos() {
    this.setState(() => ({ todos: [] }));
  }

  handleAddOption(todo) {
    if (!todo) {
      return 'Wpisz zadanie';
    } else if (this.state.todos.indexOf(todo) > -1) {
      return 'To zadanie już istnieje';
    }

    this.setState(prevState => {
      return {
        todos: prevState.todos.concat(todo)
      };
    });
  }

  render() {
    const title = 'Lista zadań:';

    return (
      <div className="container">
        <Header title={title} />
        <AddOption handleAddOption={this.handleAddOption} />
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
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }

  handleAddOption(e) {
    e.preventDefault();

    const todo = e.target.elements.todo.value.trim();
    const error = this.props.handleAddOption(todo);

    this.setState(() => {
      return {
        error
      };
    });
  }

  render() {
    return (
      <div>
      <div>{this.state.error&&<p>{this.state.error}</p>}</div>
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
        <button
          onClick={this.props.handleDeleteTodos}
          disabled={!this.props.hasTodos}
        >
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
