import {projectState} from "./ProjectState.js";
import {Project, ProjectState} from "./types/ProjectTypes.js";
import BaseComponent from "./BaseComponent.js"
import SingleProject from "./SingleProject.js";

export default class ProjectList extends BaseComponent<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[] = [];

    constructor(private type: ProjectState) {
        super(
            "project-list",
            "app",
            false,
            `${ProjectState[type]}-projects`,
        )

        this.configure();
        this.renderContent();
    }
    private getProjectListId() {
        return `${ProjectState[this.type]}-project-list`;
    }

    renderContent() {
        this.element.querySelector('ul')!.id = this.getProjectListId();
        this.element.querySelector('h2')!.textContent = `${ProjectState[this.type].toUpperCase()} Projects`;
    }

    configure() {
        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects.filter(project => {
                return project.status === this.type;
            })
            this.renderProjects();
        });
    }
    private renderProjects(): void {
        const listElement = <HTMLUListElement>document.getElementById(this.getProjectListId());
        listElement.innerHTML = "";
        for (const project of this.assignedProjects) {
            new SingleProject(this.element.querySelector('ul')!.id, project);
        }
    }
}
