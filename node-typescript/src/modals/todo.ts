export class Todo {
    constructor(private id: string, private text: string) { }

    getId() {
        return this.id;
    }

    getText() {
        return this.text;
    }

    setText(text: string) {
        this.text = text;
    }
}