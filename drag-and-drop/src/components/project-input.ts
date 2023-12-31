import {autobind} from "../decorators/autobind";
import {BaseComponent} from "./base-component";
import {Validatable, validate} from "../util/validation";
import {projectState} from "../state/project-state";

export class ProjectInput extends BaseComponent<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super(
            "project-input",
            "app",
            true,
            "user-input"
        )

        this.titleInputElement = <HTMLInputElement>this.element.querySelector("#title");
        this.descriptionInputElement = <HTMLInputElement>this.element.querySelector("#description");
        this.peopleInputElement = <HTMLInputElement>this.element.querySelector("#people");

        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    renderContent() {
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = +this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }

        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        if (!validate(titleValidatable) ||
            !validate(peopleValidatable) ||
            !validate(descriptionValidatable)) {
            alert('Invalid input please try again');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
}
