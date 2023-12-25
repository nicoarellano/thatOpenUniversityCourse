// Import OpenBIM components
import * as OBC from "openbim-components";

// Import Three js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import GUI from "three/examples/jsm/libs/lil-gui.module.min";

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
      (splittedName[1] && splittedName[1][0]
        ? splittedName[1] && splittedName[1][0].toUpperCase()
        : splittedName[0][1]
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
        progress: Math.floor(Math.random() * 100),
        color:
          "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0"),
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

// ThreeJS viewer
// const scene = new THREE.Scene();
// // scene.background = new THREE.Color("#0000ff");

// const viewerContainer = document.getElementById(
//   "viewer-container"
// ) as HTMLElement;

// const camera = new THREE.PerspectiveCamera(75);
// camera.position.x = 2;
// camera.position.z = 5;
// camera.position.y = 1;

// const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
// const domElement = renderer.domElement;
// domElement.style.borderRadius = "var(--border-radius)";
// viewerContainer.append(renderer.domElement);

// resizeViewer();

// const boxGeometry = new THREE.BoxGeometry();
// const lightColor = new THREE.Color("#ffffee");
// const redColor = new THREE.Color("#ff0000");
// const material = new THREE.MeshStandardMaterial({ color: redColor });
// const cube = new THREE.Mesh(boxGeometry, material);
// cube.position.y = 0.5;

// const ambientLight = new THREE.AmbientLight(lightColor, 0.4);
// const directionalLight = new THREE.DirectionalLight(lightColor, 0.8);
// directionalLight.position.y = 10;
// directionalLight.position.z = 15;

// const axes = new THREE.AxesHelper(5);
// const grid = new THREE.GridHelper(100, 100, "#ccc", "#777");
// grid.material.transparent = true;
// grid.material.opacity = 0.4;

// scene.add(cube, ambientLight, directionalLight, axes, grid);

// const cameraControls = new OrbitControls(camera, viewerContainer);

// function renderScene() {
//   renderer.render(scene, camera);
//   requestAnimationFrame(renderScene);
// }

// renderScene();

// function resizeViewer() {
//   const containerDimensions = viewerContainer.getBoundingClientRect();
//   renderer.setSize(containerDimensions.width, containerDimensions.height);
//   const aspectRatio = containerDimensions.width / containerDimensions.height;
//   camera.aspect = aspectRatio;
//   camera.updateProjectionMatrix();
// }

// window.addEventListener("resize", resizeViewer);

// const gui = new GUI();

// const cubeControls = gui.addFolder("Cube");
// cubeControls.add(cube.position, "x", -10, 10, 1);
// cubeControls.add(cube.position, "y", -10, 10, 1);
// cubeControls.add(cube.position, "z", -10, 10, 1);
// cubeControls.addColor(cube.material, "color");

// const gltfLoader = new GLTFLoader();
// gltfLoader.load("../assets/panel_solar_2.glb", (gltf) => {
//   scene.add(gltf.scene);
// });

// const objLoader = new OBJLoader();
// const mtlLoader = new MTLLoader();
// mtlLoader.load("../assets/Gear/Gear1.mtl", (materials) => {
//   materials.preload();
//   objLoader.setMaterials(materials);
//   objLoader.load("../assets/Gear/Gear1.obj", (mesh) => {
//     scene.add(mesh);
//   });
// });

const viewer = new OBC.Components();
const sceneComponent = new OBC.SimpleScene(viewer);

viewer.scene = sceneComponent;
const scene = sceneComponent.get();
viewer.scene = sceneComponent;
sceneComponent.setup();
scene.background = null;

const viewerContainer = document.getElementById(
  "viewer-container"
) as HTMLDivElement;
const rendererComponent = new OBC.SimpleRenderer(viewer, viewerContainer);
viewer.renderer = rendererComponent;

const cameraComponent = new OBC.OrthoPerspectiveCamera(viewer);
viewer.camera = cameraComponent;

viewer.init();
cameraComponent.updateAspect();

// const boxGeometry = new THREE.BoxGeometry();
// const redColor = new THREE.Color("#ff0000");
// const material = new THREE.MeshStandardMaterial({ color: redColor });
// const cube = new THREE.Mesh(boxGeometry, material);
// cube.position.y = 0.5;

// scene.add(cube);

const ifcLoader = new OBC.FragmentIfcLoader(viewer);
ifcLoader.settings.wasm = {
  path: "https://unpkg.com/web-ifc@0.0.43/",
  absolute: true,
};

const toolbar = new OBC.Toolbar(viewer);
toolbar.addChild(ifcLoader.uiElement.get("main"));

viewer.ui.addToolbar(toolbar);
