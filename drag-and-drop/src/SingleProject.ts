import BaseComponent from "./BaseComponent.js";
import {Project }from "./types/ProjectTypes";

export default class SingleProject extends BaseComponent<HTMLUListElement, HTMLLIElement> {

    get persons() {
        if ( this.project.people === 1 ) {
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
    }

    renderContent() {
        this.element.querySelector("h2")!.textContent = this.project.title;
        this.element.querySelector("h3")!.textContent = this.persons + ' assigned';
        this.element.querySelector("p")!.textContent = this.project.description;
    }
}
