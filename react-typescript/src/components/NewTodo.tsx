import React, { useRef } from 'react';
import "./NewTodo.css";

type NewTodoProps = {
    onAddTodo: (text: string) => void
}

const NewTodo = ({ onAddTodo }: NewTodoProps) => {
    const textInputRef = useRef<HTMLInputElement>(null);

    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (!textInputRef.current) throw Error("Todo text input is not assigned");

        const enteredText = textInputRef.current.value;
        onAddTodo(enteredText);
        textInputRef.current.value = "";
    }

    return <form onSubmit={todoSubmitHandler}>
        <div>
            <label htmlFor="todo-text">Todo Text</label>
            <input id="todo-text" type="text" ref={textInputRef} />
        </div>

        <button type="submit">Add TODO</button>
    </form>
}

export default NewTodo;