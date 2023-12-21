import { IProject, UserRole, ProjectStatus } from "./classes/Project";
import { ProjectsManager } from "./classes/ProjectsManager";

let modalOpen = false;
const toggleModal = (id: string) => {
  modalOpen = !modalOpen;
  const modal = document.getElementById(id) as HTMLDialogElement;
  if (modal && modal instanceof HTMLDialogElement) {
    if (modalOpen) modal.showModal();
    else modal.close();
  } else console.warn(`No modal with id "${id}"`);
};

document.addEventListener("keydown", function (e) {
  if (e.code === "Escape" && modalOpen) {
    toggleModal("new-project-modal");
  }
});

const projectListUI = document.getElementById(
  "projects-list"
) as HTMLDivElement;
const projectManager = new ProjectsManager(projectListUI);

const newProjectButton = document.getElementById("new-project-button");
newProjectButton
  ? newProjectButton.addEventListener("click", () =>
      toggleModal("new-project-modal")
    )
  : console.warn(`New Project Button not found!`);

const closeProjectModal = document.getElementById("close-new-project-modal");
const cancelProjectModal = document.getElementById("cancel-new-project-modal");

if (closeProjectModal)
  closeProjectModal.addEventListener("click", () =>
    toggleModal("new-project-modal")
  );
if (cancelProjectModal)
  cancelProjectModal.addEventListener("click", () =>
    toggleModal("new-project-modal")
  );

const createCode = (name: string) => {
  const splittedName = name.split(" ");
  let code = "??";

  if (name)
    code =
      splittedName[0][0].toUpperCase() +
      (splittedName.length > 1
        ? splittedName[1][0].toUpperCase()
        : splittedName.length > 0
        ? splittedName[0][1]
        : " ");

  return code;
};

const projectForm = document.getElementById("new-project-form");
projectForm && projectForm instanceof HTMLFormElement
  ? projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
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
      };
      try {
        const project = projectManager.newProject(projectData);

        projectManager.calculateTotalCost();
        console.log("Project Data: ", project);
        projectForm.reset();
        toggleModal("new-project-modal");
      } catch (err) {
        alert(err);
      }
    })
  : console.warn(`New project form was not found, check the ID`);

// ⬇️ Export projects to JSON
const exportProjectsButton = document.getElementById("export-project-btn");
if (exportProjectsButton)
  exportProjectsButton.addEventListener("click", () =>
    projectManager.exportToJSON("projects-list")
  );

// ⬇️ Import projects from JSON
const importProjectsButton = document.getElementById("import-project-btn");
if (importProjectsButton)
  importProjectsButton.addEventListener("click", () =>
    projectManager.importFromJSON()
  );

// Go to projects page

const projectsPageButton = document.getElementById(
  "projects-page-button"
) as HTMLElement;

projectsPageButton.addEventListener("click", () => {
  const projectsPage = document.getElementById("projects-page");
  const detailsPage = document.getElementById("project-details");

  if (!projectsPage || !detailsPage) return;
  projectsPage.style.display = "flex";
  detailsPage.style.display = "none";
});
