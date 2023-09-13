class ProjectState {
    private projects: any[] = [];
    private listeners: any[] = [];
    private static instance: ProjectState;
    private constructor() {}

    static getInstance(): ProjectState {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }

    public addProject(title: string, description:string, numOfPeople:number){
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            numOfPeople: numOfPeople
        }
        this.projects.push(newProject);
        for(const listenerFn of this.listeners) {
            // pass a brand-new copy of projects
            listenerFn(this.projects.slice());
        }
    }

    public addListener(listenerFunction: Function) {
        this.listeners.push(listenerFunction)
    }
}
const projectState = ProjectState.getInstance();

export {projectState}

