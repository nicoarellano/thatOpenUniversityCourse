import * as React from "react";
import { ProjectsManager } from "../classes/ProjectsManager";
import { IProject, ProjectStatus, UserRole } from "../classes/Project";

interface Props {
  projectsManager: ProjectsManager;
}

export function NewProjectModal(props: Props) {
  const tipStyle: React.CSSProperties = {
    color: "var(--background-300)",
    marginTop: "5px",
    fontSize: "var(--font-sm)",
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectForm = document.getElementById("new-project-form");
    if (!(projectForm && projectForm instanceof HTMLFormElement)) return;
    const formData = new FormData(projectForm);
    const projectData: IProject = {
      id: crypto.randomUUID(),
      name: formData.get("name") as string,
      code: createCode(formData.get("name") as string),
      description: formData.get("description") as string,
      userRole: formData.get("userRole") as UserRole,
      status: formData.get("status") as ProjectStatus,
      cost: Number(formData.get("cost")),
      finishDate: new Date(formData.get("finish-date") as string),
      progress: Math.floor(Math.random() * 100),
    };
    try {
      const project = props.projectsManager.newProject(projectData);

      props.projectsManager.calculateTotalCost();
      projectForm.reset();
      cancelModal();
    } catch (err) {
      alert(err);
    }
  };

  const onCancelProjectModalClick = () => cancelModal();
  const onCloseProjectModalClick = () => cancelModal();

  const cancelModal = () => {
    const projectForm = document.getElementById("new-project-form");
    if (!(projectForm && projectForm instanceof HTMLFormElement)) return;
    projectForm.reset();

    const modal = document.getElementById("new-project-modal");
    if (!(modal && modal instanceof HTMLDialogElement)) return;
    modal.close();
  };

  const createCode = (name: string) => {
    const splittedName = name.split(" ");
    let code = "??";

    if (name)
      code =
        splittedName[0][0].toUpperCase() +
        (splittedName[1] && splittedName[1][0]
          ? splittedName[1] && splittedName[1][0].toUpperCase()
          : splittedName[0][1]
          ? splittedName[0][1]
          : " ");

    return code;
  };

  return (
    <dialog id="new-project-modal">
      <form id="new-project-form" onSubmit={(e) => onFormSubmit(e)}>
        <div id="form-header">
          <h2>New Project</h2>
          <span
            onClick={onCloseProjectModalClick}
            className="material-symbols-rounded icon"
            title="Close"
          >
            close
          </span>
        </div>
        <div className="input-list">
          <div className="form-field-container">
            <label>
              <span className="material-symbols-rounded"> apartment </span>
              Name
            </label>
            <input
              name="name"
              required
              minLength={5}
              maxLength={20}
              type="text"
              placeholder="What is the name of your project?"
            />
            <h6 style={tipStyle}>
              <i>
                Give it a short name, not shorter than 5 characters or longer
                than 20
              </i>
            </h6>
          </div>
          <div className="form-field-container">
            <label>
              <span className="material-symbols-rounded"> subject </span>
              Description
            </label>
            <textarea
              name="description"
              cols={30}
              rows={1}
              placeholder="Give your project description"
            ></textarea>
          </div>
          <div className="form-field-container">
            <label>
              <span className="material-symbols-rounded"> account_circle </span>
              Role
            </label>
            <select name="userRole" defaultValue="select">
              <option hidden value="select">
                Select user role
              </option>
              <option>Architect</option>
              <option>Engineer</option>
              <option>Developer</option>
            </select>
          </div>
          <div className="form-field-container">
            <label>
              <span className="material-symbols-rounded"> check_box </span>
              Status
            </label>
            <select defaultValue="select" name="status">
              <option hidden value="select">
                Select status
              </option>
              <option>Pending</option>
              <option>Active</option>
              <option>Finished</option>
            </select>
          </div>
          <div className="form-field-container">
            <label>
              <span className="material-symbols-rounded">
                {" "}
                monetization_on{" "}
              </span>
              Cost
            </label>
            <input name="cost" type="number" />
          </div>
          <div className="form-field-container">
            <label>
              <span className="material-symbols-rounded">calendar_clock</span>
              Finish Date
            </label>
            <input name="finish-date" type="date" title="Finish Date" />
          </div>
        </div>
        <div id="form-action">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancelProjectModalClick}
            id="cancel-new-project-modal"
          >
            Cancel
          </button>
          <button type="submit" className="button">
            Accept
          </button>
        </div>
      </form>
    </dialog>
  );
}
