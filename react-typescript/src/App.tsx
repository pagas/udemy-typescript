import React from 'react';
import TodoList from './components/TodoList';

const App = () => {
  const todos = [{id: 't1', text: "Finish teh course"}]
  return (
    <div className="App">
      {/* will have component that add's todos */}
      <h1>Todo</h1>
      <TodoList todos={todos}/>
    </div>
  );
}


export default App;
