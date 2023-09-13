import {Project,
    ProjectState as ProjectStateEnum,
} from "./types/ProjectTypes.js";
import BaseState from "./BaseState.js";


class ProjectState extends BaseState<Project>{
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
}
const projectState = ProjectState.getInstance();

export {projectState}

