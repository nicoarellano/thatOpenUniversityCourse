export type ProjectStatus = "Active" | "Pending" | "Finished" | "undefined";
export type UserRole = "Architect" | "Engineer" | "Developer" | "undefined";

export interface IProject {
  id: string;
  name: string;
  code: string;
  description: string;
  userRole: UserRole;
  status: ProjectStatus;
  cost: number;
  finishDate: Date;
  color: string;
  progress: number;
}

export class Project implements IProject {
  // To satisfy IProject
  id: string;
  name: string;
  code: string;
  description: string;
  userRole: UserRole;
  status: ProjectStatus;
  cost: number;
  finishDate: Date;
  color: string;
  progress: number;

  // Class internals
  ui: HTMLDivElement;

  constructor(data: IProject) {
    const today = new Date();

    this.id = data.id;
    this.name = data.name ? data.name : "no name";
    this.code = data.code;
    this.description = this.description = data.description
      ? data.description
      : "no description";
    this.userRole = data.userRole ? data.userRole : "undefined";
    this.status = data.status ? data.status : "undefined";
    this.cost = data.cost ? data.cost : 0;
    this.finishDate = data.finishDate.getDay() ? data.finishDate : today;
    this.color = data.color;
    this.progress = data.progress;
    this.setUi();
  }

  setUi() {
    if (this.ui) return;

    this.ui = document.createElement("div");
    this.ui.className = "project-card";
    this.ui.setAttribute("id", this.id);
    this.ui.innerHTML = `
  <div class="card-header" style="
  display: flex;
  align-items: center;
  justify-content: space-between;
">
  <div style="display: flex; flex-direction: row; column-gap: 1rem; align-items: center;">
    <p
      style="
        display: flex;
        align-items: center;
        background-color: ${this.color};
        padding: 0.8rem;
        border-radius: 8px;
        aspect-ratio: 1;
      "
    >
      ${this.code}
    </p>
    <div>
      <h5>${this.name}</h5>
      <p>${this.description}</p>
    </div>
    </div>
    <div id="delete-project-${this.id}" class="icon">
    <span  title="Delete project" class="material-symbols-rounded">
    delete
    </span>
    </div>
  </div>
  <div class="card-content">
    <div class="card-property">
      <p style="color: var(--background-300)">UserRole</p>
      <p>${this.userRole}</p>
    </div>
    <div class="card-property">
      <p style="color: var(--background-300)">Status</p>
      <p>${this.status}</p>
    </div>
    <div class="card-property">
      <p style="color: var(--background-300)">Cost</p>
      <p>$ ${this.cost}</p>
    </div>
    <div class="card-property">
      <p style="color: var(--background-300)">Progress</p>
      <p>${this.progress}%</p>
    </div>
  </div>
  `;
  }
}
