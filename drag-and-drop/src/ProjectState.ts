import {Project,
    ProjectState as ProjectStateEnum,
    ProjectStateListener
} from "./types/ProjectTypes.js";


class ProjectState {
    private projects: Project[] = [];
    private listeners: ProjectStateListener[] = [];
    private static instance: ProjectState;
    private constructor() {}

    static getInstance(): ProjectState {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }

    public addProject(title: string, description:string, numOfPeople:number){
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStateEnum.active
        )
        this.projects.push(newProject);
        for(const listenerFn of this.listeners) {
            // pass a brand-new copy of projects
            listenerFn(this.projects.slice());
        }
    }

    public addListener(listenerFunction: ProjectStateListener) {
        this.listeners.push(listenerFunction)
    }
}
const projectState = ProjectState.getInstance();

export {projectState}

