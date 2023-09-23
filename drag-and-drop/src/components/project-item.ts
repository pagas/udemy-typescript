import {Draggable} from "../models/drag-drop";
import {BaseComponent} from "./base-component";
import {Project} from "../models/project";
import {autobind} from "../decorators/autobind";

export class ProjectItem extends BaseComponent<HTMLUListElement, HTMLLIElement>
    implements Draggable {

    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} persons`;
        }
    }

    constructor(hostId: string, private project: Project) {

        super(
            "single-project",
            hostId,
            false,
            project.id
        );

        this.configure()
        this.renderContent();
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler)
        this.element.addEventListener('dragend', this.dragEndHandler)
    }

    renderContent() {
        this.element.querySelector("h2")!.textContent = this.project.title;
        this.element.querySelector("h3")!.textContent = this.persons + ' assigned';
        this.element.querySelector("p")!.textContent = this.project.description;
    }

    @autobind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @autobind
    dragEndHandler(event: DragEvent) {
        console.log('dragEndHandler');
    }


}
