import {ProjectInput} from "./components/project-input";
import {ProjectList} from "./components/project-list";
import {ProjectStateEnum} from "./models/project";


const projectInput = new ProjectInput();
const activeProject = new ProjectList(ProjectStateEnum.active);
const finishedProject = new ProjectList(ProjectStateEnum.finished);


