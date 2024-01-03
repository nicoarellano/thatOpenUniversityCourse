// Import React
import * as react from "react";
import * as ReactDOM from "react-dom/client";
import { Sidebar } from "./react-components/Sidebar";
import { ProjectsPage } from "./react-components/ProjectsPage";

// Import OpenBIM components
import * as OBC from "openbim-components";
import { FragmentsGroup } from "bim-fragment";

// Import Three js
import * as THREE from "three";

import { ProjectsManager } from "./classes/ProjectsManager";
import { TodoCreator } from "./bim-components/TodoCreator";
import { SimpleQTO } from "./bim-components/SimpleQTO";

const rootElement = document.getElementById("app") as HTMLDivElement;
const appRoot = ReactDOM.createRoot(rootElement);
appRoot.render(
  <>
    <Sidebar />
    <ProjectsPage />
  </>
);

const models: FragmentsGroup[] = [];

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
const rendererComponent = new OBC.PostproductionRenderer(
  viewer,
  viewerContainer
);
viewer.renderer = rendererComponent;

const cameraComponent = new OBC.OrthoPerspectiveCamera(viewer);
viewer.camera = cameraComponent;

const raycasterComponent = new OBC.SimpleRaycaster(viewer);
viewer.raycaster = raycasterComponent;
rendererComponent.postproduction.enabled = true;

viewer.init();
cameraComponent.updateAspect();

const classifier = new OBC.FragmentClassifier(viewer);
const classificationWindow = new OBC.FloatingWindow(viewer);
viewer.ui.add(classificationWindow);
classificationWindow.title = "Model Groups";
classificationWindow.visible = false;

const classificationBtn = new OBC.Button(viewer);
classificationBtn.materialIcon = "account_tree";
classificationBtn.tooltip = "Model tree";
classificationBtn.visible = false;

classificationBtn.onClick.add(() => {
  classificationWindow.visible = !classificationWindow.visible;
  classificationWindow.active = classificationWindow.visible;
});

const shareBtn = new OBC.Button(viewer);
shareBtn.materialIcon = "share";
shareBtn.tooltip = "Share view";
shareBtn.visible = false;

shareBtn.onClick.add(() => {
  if (!(cameraComponent instanceof OBC.OrthoPerspectiveCamera)) {
    throw new Error(
      "Share Camera needs the OrthoPerspectiveCamera in order to work"
    );
  }

  const position = new THREE.Vector3();
  cameraComponent.controls.getPosition(position);
  const target = new THREE.Vector3();
  cameraComponent.controls.getTarget(target);
  const shareCamera = { position, target };

  JSON.stringify(shareCamera);
  alert("View shared!" + JSON.stringify(shareCamera));
});

const fragmentManager = new OBC.FragmentManager(viewer);

function exportFragments(model: FragmentsGroup) {
  const fragmentBinary = fragmentManager.export(model);

  const blob = new Blob([fragmentBinary]);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${model.name.replace(".ifc", "")}.frag`;
  a.click();
  URL.revokeObjectURL(url);

  if (!model.properties) return;
  const properties = model.properties;

  const propBlob = new Blob([JSON.stringify(properties)], {
    type: "text/json",
  });
  const propUrl = URL.createObjectURL(propBlob);
  const propA = document.createElement("a");
  propA.href = propUrl;
  propA.download = `${model.name.replace(".ifc", "")}.json`;
  propA.click();
  URL.revokeObjectURL(propUrl);
}

const ifcLoader = new OBC.FragmentIfcLoader(viewer);
ifcLoader.settings.wasm = {
  path: "https://unpkg.com/web-ifc@0.0.44/",
  absolute: true,
};

const highlighter = new OBC.FragmentHighlighter(viewer);
highlighter.setup();

const propertiesProcessor = new OBC.IfcPropertiesProcessor(viewer);
highlighter.events.select.onClear.add(() => {
  propertiesProcessor.cleanPropertiesList();
});

async function createModelTree() {
  const fragmentTree = new OBC.FragmentTree(viewer);
  await fragmentTree.init();
  await fragmentTree.update(["storeys", "entities"]);
  fragmentTree.onHovered.add((fragmentMap) => {
    highlighter.highlightByID("hover", fragmentMap);
  });
  fragmentTree.onSelected.add((fragmentMap) => {
    highlighter.highlightByID("select", fragmentMap);
  });
  const tree = fragmentTree.get().uiElement.get("tree");
  return tree;
}

const culler = new OBC.ScreenCuller(viewer);
cameraComponent.controls.addEventListener(
  "sleep",
  () => (culler.needsUpdate = true)
);

async function onModelLoaded(model: FragmentsGroup) {
  highlighter.update();
  for (const fragment of model.items) culler.add(fragment.mesh);
  culler.needsUpdate = true;

  try {
    classifier.byStorey(model);
    classifier.byEntity(model);
    const tree = await createModelTree();
    await classificationWindow.slots.content.dispose(true);
    classificationWindow.addChild(tree);

    propertiesProcessor.process(model);
    highlighter.events.select.onHighlight.add((fragmentMap) => {
      const expressID = [...Object.values(fragmentMap)[0]][0];
      propertiesProcessor.renderProperties(model, Number(expressID));
    });
    models.push(model);

    const modelsLength = models.length;
    if (modelsLength > 0) {
      classificationBtn.visible = true;
      shareBtn.visible = true;
      exportBtn.visible = true;
      toolbar.addChild(
        propertiesProcessor.uiElement.get("main"),
        propsFinder.uiElement.get("main"),
        fragmentManager.uiElement.get("main"),
        simpleQTO.uiElement.get("activationBtn")
      );
    }
  } catch (error) {
    alert(error);
  }
}

const exportBtn = new OBC.Button(viewer);
exportBtn.materialIcon = "download";
exportBtn.tooltip = "Export Fragment";
exportBtn.visible = false;

ifcLoader.onIfcLoaded.add(async (model) => {
  onModelLoaded(model);

  exportBtn.onClick.add(() => {
    if (!model) {
      throw new Error("No model to download");
    }
    exportFragments(model);
  });
});

fragmentManager.onFragmentsLoaded.add((model) => {
  onModelLoaded(model);
});

const importFragmentBtn = new OBC.Button(viewer);
importFragmentBtn.materialIcon = "upload";
importFragmentBtn.tooltip = "Load FRAG";

importFragmentBtn.onClick.add(() => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".frag";
  const reader = new FileReader();
  reader.addEventListener("load", async () => {
    const binary = reader.result;
    if (!(binary instanceof ArrayBuffer)) return;
    const fragmentBinary = new Uint8Array(binary);
    await fragmentManager.load(fragmentBinary);
  });
  input.addEventListener("change", () => {
    const filesList = input.files;
    if (!filesList) return;
    reader.readAsArrayBuffer(filesList[0]);
  });
  input.click();
});

const todoCreator = new TodoCreator(viewer);
await todoCreator.setup();
todoCreator.onProjectCreated.add((todo) => console.log(todo));

const simpleQTO = new SimpleQTO(viewer);
await simpleQTO.setup();

const propsFinder = new OBC.IfcPropertiesFinder(viewer);
await propsFinder.init();
propsFinder.onFound.add((fragmentIDMap) => {
  highlighter.highlightByID("select", fragmentIDMap);
});

const toolbar = new OBC.Toolbar(viewer);
toolbar.addChild(
  ifcLoader.uiElement.get("main"),
  importFragmentBtn,
  classificationBtn,
  shareBtn,
  exportBtn,
  todoCreator.uiElement.get("activationBtn")
);

viewer.ui.addToolbar(toolbar);
