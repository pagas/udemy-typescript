export default class SinglePage {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;

    constructor() {
        this.templateElement = <HTMLTemplateElement>document.getElementById("single-project");
        this.hostElement = <HTMLDivElement>document.getElementById("app");

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = <HTMLFormElement>importedNode.firstElementChild;
    }

    public attach(hostElement:HTMLDivElement) {
        hostElement.insertAdjacentElement('beforebegin', this.element);
    }
}
