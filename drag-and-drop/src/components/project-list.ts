import {BaseComponent} from "./base-component";
import {DragTarget} from "../models/drag-drop";
import {Project, ProjectStateEnum} from "../models/project";
import {projectState} from "../state/project-state";
import {autobind} from "../decorators/autobind";
import {ProjectItem} from "./project-item";

export class ProjectList extends BaseComponent<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project[] = [];

    constructor(private type: ProjectStateEnum) {
        super(
            "project-list",
            "app",
            false,
            `${ProjectStateEnum[type]}-projects`,
        )

        this.configure();
        this.renderContent();
    }

    private getProjectListId() {
        return `${ProjectStateEnum[this.type]}-project-list`;
    }

    renderContent() {
        this.element.querySelector('ul')!.id = this.getProjectListId();
        this.element.querySelector('h2')!.textContent = `${ProjectStateEnum[this.type].toUpperCase()} Projects`;
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
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
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
            new ProjectItem(this.element.querySelector('ul')!.id, project);
        }
    }
}

