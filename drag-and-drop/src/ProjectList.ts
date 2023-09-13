import {projectState} from "./ProjectState.js";
import {Project, ProjectState} from "./types/ProjectTypes.js";

export default class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: Project[] = [];

    constructor(private type: ProjectState) {
        this.templateElement = <HTMLTemplateElement>document.getElementById("project-list");
        this.hostElement = <HTMLDivElement>document.getElementById("app");

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <HTMLElement>importedNode.firstElementChild;
        this.element.id = `${ProjectState[this.type]}-projects`;

        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects.filter(project => {
                return project.status === this.type;
            })
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    private getProjectListId() {
        return `${ProjectState[this.type]}-project-list`;
    }

    private renderProjects(): void {
        const listElement = <HTMLUListElement>document.getElementById(this.getProjectListId());
        listElement.innerHTML = "";
        for (const project of this.assignedProjects) {
            const listItem = <HTMLLIElement>document.createElement('li');
            listItem.textContent = project.title;
            listElement.appendChild(listItem)
        }
    }

    private renderContent() {
        this.element.querySelector('ul')!.id = this.getProjectListId();
        this.element.querySelector('h2')!.textContent = `${ProjectState[this.type].toUpperCase()} Projects`;
    }

    public attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
