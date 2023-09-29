"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getAllTodos = exports.createTodo = void 0;
const todo_1 = require("../modals/todo");
let Todos = [];
const createTodo = (request, response, next) => {
    const text = request.body.text;
    const newTodo = new todo_1.Todo((Math.floor(Math.random() * 100)).toString(), text);
    Todos.push(newTodo);
    response.status(201).json({
        message: 'Created the todo.',
        createdTodo: newTodo
    });
};
exports.createTodo = createTodo;
const getAllTodos = (request, response) => {
    response.json({
        todos: Todos
    });
};
exports.getAllTodos = getAllTodos;
const updateTodo = (request, response) => {
    const id = request.params.id;
    const text = request.body.text;
    const newTodo = Todos.find(todo => todo.getId() === id);
    if (!newTodo) {
        throw new Error("Could not find todo!");
    }
    newTodo.setText(text);
    response.status(201).json({
        message: 'Successfully updated.',
        updatedTodo: newTodo
    });
};
exports.updateTodo = updateTodo;
const deleteTodo = (request, response) => {
    const id = request.params.id;
    Todos = Todos.filter(todo => todo.getId() !== id);
    response.status(201).json({
        message: 'Successfully deleted.'
    });
};
exports.deleteTodo = deleteTodo;
