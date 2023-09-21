/// <reference path="./components/project-input.ts" />
/// <reference path="./components/project-list.ts" />
/// <reference path="./models/project.ts" />

namespace App {

    const projectInput = new ProjectInput();
    const activeProject = new ProjectList(ProjectStateEnum.active);
    const finishedProject = new ProjectList(ProjectStateEnum.finished);
}

