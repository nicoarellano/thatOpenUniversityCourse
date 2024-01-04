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
  progress: number;
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
    this.progress = data.progress;
  }
}
