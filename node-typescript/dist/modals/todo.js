"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
class Todo {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
    getId() {
        return this.id;
    }
    getText() {
        return this.text;
    }
    setText(text) {
        this.text = text;
    }
}
exports.Todo = Todo;
