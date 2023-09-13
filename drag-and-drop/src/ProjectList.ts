import {projectState} from "./ProjectState.js";

export default class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: any[] = [];

    constructor(private type: 'active' | 'finished') {
        this.templateElement = <HTMLTemplateElement>document.getElementById("project-list");
        this.hostElement = <HTMLDivElement>document.getElementById("app");

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <HTMLElement>importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects: any[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }

    private renderProjects(): void {
        const listElement = <HTMLUListElement>document.getElementById(`${this.type}-project-list`);
        for (const project of this.assignedProjects) {
            const listItem = <HTMLLIElement>document.createElement('li');
            listItem.textContent = project.title;
            listElement.appendChild(listItem)
        }
    }

    private renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} Projects`;

    }

    public attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
