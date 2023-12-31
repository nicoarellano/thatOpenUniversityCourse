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
      description: "Default project description",
      status: "undefined",
      userRole: "undefined",
      finishDate: new Date(),
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

  getProject(id: string) {
    const project = this.list.find((project) => {
      return project.id === id;
    });
    return project;
  }

  filterProjects(value: string) {
    const filteredProjects = this.list.filter((project) =>
      project.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    return filteredProjects;
  }

  getProjectByName(name: string) {
    const project = this.list.find((project) => {
      return project.name === name;
    });
    return project;
  }

  editProjectById(id: string) {
    const project = this.list.find((project) => {
      return project.id === id;
    });

    if (!(project && project instanceof Project)) return;

    const newProject = { ...project, name: "NEW NAME" };
    Object.assign(project, newProject);
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
