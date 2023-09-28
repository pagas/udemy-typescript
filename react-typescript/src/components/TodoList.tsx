import React from 'react';
import { Todo } from '../todo.model';

type TodoProps = {
    todos: Todo[],
    onDelete: (id: string) => void
}

const TodoList = ({ todos, onDelete }: TodoProps) => {

    const deleteHandler = (id: string) => {
        onDelete(id);
    }

    return <ul>
        {todos.map(todo => (
            <li key={todo.id}>
                <span>{todo.text}</span>
                <button onClick={() => deleteHandler(todo.id)}>Delete</button>
            </li>
        ))}
    </ul>
}

export default TodoList;