export type ProjectStatus = "Active" | "Pending" | "Finished" | "undefined";
export type UserRole = "Architect" | "Engineer" | "Developer" | "undefined";

export interface IProject {
  id: string;
  name: string;
  description: string;
  userRole: UserRole;
  status: ProjectStatus;
  cost: number;
  finishDate: Date;
}

export class Project implements IProject {
  // To satisfy IProject
  id: string;
  name: string;
  description: string;
  userRole: UserRole;
  status: ProjectStatus;
  cost: number;
  finishDate: Date;

  // Class internals
  ui: HTMLDivElement;
  progress: number = 0;

  constructor(data: IProject) {
    // This helps to iterate through the data instead of creating each one. not my case
    // for (const key in data) {
    //   this[key] = data[key]
    // }

    this.id = data.id;
    this.name = data.name ? data.name : "no name";
    this.description = data.description ? data.description : "no description";
    this.userRole = data.userRole ? data.userRole : "undefined";
    this.status = data.status ? data.status : "undefined";
    this.cost = data.cost ? data.cost : 0;
    this.finishDate = data.finishDate;
    this.setUi();
  }

  setUi() {
    if (this.ui) return;

    this.ui = document.createElement("div");
    this.ui.className = "project-card";
    this.ui.setAttribute("id", this.id);

    const splittedName = this.name.split(" ");
    let initials = "??";

    if (this.name)
      initials =
        splittedName[0][0].toUpperCase() +
        (splittedName.length > 1
          ? splittedName[1][0].toUpperCase()
          : splittedName[0][1]);

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
        background-color: var(--secondary);
        padding: 0.8rem;
        border-radius: 8px;
        aspect-ratio: 1;
      "
    >
      ${initials}
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
      <p>${this.progress * 100}%</p>
    </div>
  </div>
  `;
  }
}
