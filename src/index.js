import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteTodos = this.handleDeleteTodos.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.state = {
      todos: props.todos
    };
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('todos');
      const todos = JSON.parse(json);

      if (todos) {
        this.setState(() => ({ todos }));
      }
    } catch (e) {}
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos.length !== this.state.todos.length) {
      const json = JSON.stringify(this.state.todos);
      localStorage.setItem('todos', json);
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleDeleteTodos() {
    this.setState(() => ({ todos: [] }));
  }
  handleDeleteTodo(todoToRemove) {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => {
        return todoToRemove !== todo;
      })
    }));
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
          handleDeleteTodo={this.handleDeleteTodo}
        />
        <Filter />
      </div>
    );
  }
}

TodoApp.defaultProps = {
  todos: []
};

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

    this.setState(() => ({ error }));
  }

  render() {
    return (
      <div>
        <div>{this.state.error && <p>{this.state.error}</p>}</div>
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
        {this.props.todos.map((todo, index) => (
          <Option
            key={todo}
            optionText={todo}
            count={index + 1}
            handleDeleteTodo={this.props.handleDeleteTodo}
          />
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
    return (
      <div>
        <p>
          {this.props.count}. {this.props.optionText}
        </p>
        <button
          onClick={e => {
            this.props.handleDeleteTodo(this.props.optionText);
          }}
        >
          Usuń
        </button>
      </div>
    );
  }
}

class Filter extends React.Component {
  render() {
    return <div> Filter</div>;
  }
}

ReactDOM.render(<TodoApp />, document.querySelector('#root'));
