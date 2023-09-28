import React from 'react';

type Todo = {
    id: string
    text: string
}

type TodoProps = {
    todos: Todo[]
}

const TodoList = ({ todos }: TodoProps) => {

    return <ul>
        {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
}

export default TodoList;