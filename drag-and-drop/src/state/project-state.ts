import {BaseState} from "./base-state";
import {Project, ProjectStateEnum} from "../models/project";

class ProjectState extends BaseState<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance(): ProjectState {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStateEnum.active
        )
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(id: string, status: ProjectStateEnum) {
        const foundProject = this.projects.find(project => project.id === id);
        if (foundProject && foundProject.status !== status) {
            foundProject.status = status;
            this.updateListeners();
        }

    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            // pass a brand-new copy of projects
            listenerFn(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();

