import React, { useState } from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoAddHandler = (text: string) => {
    setTodos(prevState => [...prevState, { id: Math.random().toString(), text: text }])
  }
  const deleteHandler = (id: string) => {
    setTodos(prevState => prevState.filter(todo => todo.id !== id))
  }
  return (
    <div className="App">
      <h1>Todo</h1>
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList todos={todos} onDelete={deleteHandler} />
    </div>
  );
}


export default App;
