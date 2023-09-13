// const formTemplate = <HTMLTemplateElement>document.getElementById("project-input");
// const singleProject = document.getElementById("single-project");
// const projectListTemplate = <HTMLTemplateElement>document.getElementById("project-list");
//
// console.log('form found', formTemplate);
//
// document.body.appendChild(formTemplate.content.cloneNode(true));
//
// document.body.appendChild(projectListTemplate.content.cloneNode(true));
// document.body.appendChild(projectListTemplate.content.cloneNode(true));

import ProjectInput from "./ProjectInput.js";
import ProjectList from "./ProjectList.js";

const projectInput = new ProjectInput();
const activeProject = new ProjectList('active');
const finishedProject = new ProjectList('finished');


