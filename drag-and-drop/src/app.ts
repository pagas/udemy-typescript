import {ProjectInput} from "./components/project-input.js";
import {ProjectList} from "./components/project-list.js";
import {ProjectStateEnum} from "./models/project.js";


const projectInput = new ProjectInput();
const activeProject = new ProjectList(ProjectStateEnum.active);
const finishedProject = new ProjectList(ProjectStateEnum.finished);


