import { RequestHandler } from "express";
import { Todo } from "../modals/todo";


let Todos: Todo[] = [];

export const createTodo: RequestHandler = (request, response, next) => {
    const text = (request.body as { text: string }).text;
    const newTodo = new Todo((Math.floor(Math.random() * 100)).toString(), text);

    Todos.push(newTodo);
    response.status(201).json({
        message: 'Created the todo.',
        createdTodo: newTodo
    })
}

export const getAllTodos:RequestHandler = (request, response) => {
    response.json({
        todos: Todos
    })
}

export const updateTodo:RequestHandler<{id: string}> = (request, response) => {
    const id = request.params.id;
    const text = (request.body as { text: string }).text;
    const newTodo = Todos.find(todo => todo.getId() === id);

    if (!newTodo) {
        throw new Error("Could not find todo!")
    }

    newTodo.setText(text);

    response.status(201).json({
        message: 'Successfully updated.',
        updatedTodo: newTodo
    })
}

export const deleteTodo:RequestHandler<{id: string}> = (request, response) => {
    const id = request.params.id;
    Todos = Todos.filter(todo => todo.getId() !== id);

    response.status(201).json({
        message: 'Successfully deleted.'
    })
}

