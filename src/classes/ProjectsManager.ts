import { IProject, Project } from "./Project";

export class ProjectsManager {
  list: Project[] = [];
  onProjectCreated = (project: Project) => {};
  onProjectDeleted = () => {};
  totalCost: number;

  constructor() {
    const project = this.newProject({
      id: crypto.randomUUID(),
      name: "Default Project",
      code: "NN",
      description: "This is just a default app project",
      status: "undefined",
      userRole: "undefined",
      finishDate: new Date(),
      color: "#6b8ec6",
      progress: 66,
      cost: 0,
    });
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
    this.list.push(project);

    const closeBtn = document.getElementById(`delete-project-${data.id}`);
    if (closeBtn)
      closeBtn.addEventListener("click", (e) => {
        this.deleteProject(data.id);
        e.stopPropagation(); // prevent parent's onclick even from firing https://stackoverflow.com/questions/1369035/how-do-i-prevent-a-parents-onclick-event-from-firing-when-a-child-anchor-is-cli
      });
    this.onProjectCreated(project);
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
    ];

    for (const attribute of detailAttributes) {
      const name = detailsPage.querySelector(
        `[data-project-info='${attribute}']`
      );
      if (name && (project[attribute] === 0 || project[attribute]))
        name.textContent = project[attribute];
    }
    const cardName = detailsPage.querySelector(
      `[data-project-info='cardName']`
    );
    if (cardName) cardName.textContent = project.name;

    const cardDescription = detailsPage.querySelector(
      `[data-project-info='cardDescription']`
    );
    if (cardDescription) cardDescription.textContent = project.description;

    const code = detailsPage.querySelector(
      `[data-project-info='code']`
    ) as HTMLElement;
    if (code) code.style.backgroundColor = project.color;

    const progress = detailsPage.querySelector(
      `[data-project-info='progress']`
    ) as HTMLElement;
    if (progress) {
      progress.style.width = `${project.progress}%`;
      progress.textContent = `${project.progress}%`;
    }

    const finishDate = detailsPage.querySelector(
      `[data-project-info='finishDate']`
    );
    if (finishDate) finishDate.textContent = project.finishDate.toDateString();
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

    const remaining = this.list.filter((project) => {
      return project.id !== id;
    });
    this.list = remaining;
    this.onProjectDeleted();
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
