import { IProject, Project } from "./Project";

export class ProjectsManager {
  list: Project[] = [];
  ui: HTMLDivElement;
  totalCost: number;

  constructor(container: HTMLDivElement) {
    this.ui = container;
  }

  newProject(data: IProject) {
    const projectNames = this.list.map((project) => {
      return project.name;
    });
    const nameInUse = projectNames.includes(data.name);
    if (nameInUse) {
      throw new Error(`A project with the name "${data.name}" already exists`);
    }

    const project = new Project(data);
    this.ui.append(project.ui);
    this.list.push(project);

    project.ui.addEventListener("click", () => {
      const projectsPage = document.getElementById("projects-page");
      const detailsPage = document.getElementById("project-details");

      if (!projectsPage || !detailsPage) return;
      projectsPage.style.display = "none";
      detailsPage.style.display = "flex";
      this.setDetailsPage(project);
    });

    const closeBtn = document.getElementById(`delete-project-${data.id}`);
    if (closeBtn)
      closeBtn.addEventListener("click", (e) => {
        this.deleteProject(data.id);
        e.stopPropagation(); // prevent parent's onclick even from firing https://stackoverflow.com/questions/1369035/how-do-i-prevent-a-parents-onclick-event-from-firing-when-a-child-anchor-is-cli
      });
    return project;
  }

  private setDetailsPage(project: Project) {
    const detailsPage = document.getElementById("project-details");
    if (!detailsPage) return;

    const detailAttributes = [
      "name",
      "description",
      "code",
      "status",
      "cost",
      "userRole",
      "finishDate",
      "progress",
    ];

    for (const attribute of detailAttributes) {
      const name = detailsPage.querySelector(
        `[data-project-info='${attribute}']`
      );
      if (name && project[attribute]) name.textContent = project[attribute];
    }
    const cardName = detailsPage.querySelector(
      `[data-project-info='cardName']`
    );
    if (cardName) cardName.textContent = project.name;

    const cardDescription = detailsPage.querySelector(
      `[data-project-info='cardDescription']`
    );
    if (cardDescription) cardDescription.textContent = project.description;
  }

  getProject(id: string) {
    const project = this.list.find((project) => {
      return project.id === id;
    });
    return project;
  }

  getProjectByName(name: string) {
    const project = this.list.find((project) => {
      return project.name === name;
    });
    return project;
  }

  deleteProject(id: string) {
    const project = this.getProject(id);
    if (!project) return;
    project.ui.remove();

    const remaining = this.list.filter((project) => {
      return project.id !== id;
    });
    this.list = remaining;
  }

  calculateTotalCost() {
    let totalCost = 0;
    this.list.map((project) => {
      totalCost += project.cost;
    });
    this.totalCost = totalCost;
    console.log("TOTAL COST: $", totalCost);
    return totalCost;
  }

  exportToJSON(fileName: string = "projects") {
    if (this.list.length === 0) return;
    const json = JSON.stringify(this.list, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  importFromJSON() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const json = reader.result;
      if (!json) return;
      const projects: IProject[] = JSON.parse(json as string);
      for (const project of projects) {
        try {
          this.newProject(project);
        } catch (error) {}
      }
    });
    input.addEventListener("change", () => {
      const filesList = input.files;
      if (!filesList) return;
      reader.readAsText(filesList[0]);
    });
    input.click();
  }
}
