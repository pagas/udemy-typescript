import {projectState} from "./ProjectState.js";
import {Project, ProjectState} from "./types/ProjectTypes.js";
import BaseComponent from "./BaseComponent.js"
import SingleProject from "./SingleProject.js";
import {DragTarget} from "./types/DragDropTypes.js";
import {autobind} from "./decorators/index.js";

export default class ProjectList extends BaseComponent<HTMLDivElement, HTMLElement>
    implements DragTarget {
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
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects.filter(project => {
                return project.status === this.type;
            })
            this.renderProjects();
        });
    }
    @autobind
    dropHandler(event: DragEvent) {
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projectId, this.type);

    }
    @autobind
    dragOverHandler(event: DragEvent) {
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            // to allow drop event to happen
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }
    @autobind
    dragLeaveHandler(event: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    private renderProjects(): void {
        const listElement = <HTMLUListElement>document.getElementById(this.getProjectListId());
        listElement.innerHTML = "";
        for (const project of this.assignedProjects) {
            new SingleProject(this.element.querySelector('ul')!.id, project);
        }
    }
}
