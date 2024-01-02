import * as OBC from "openbim-components";
import * as THREE from "three";
import { TodoCard } from "./src/TodoCard";

interface ToDo {
  description: string;
  date: Date;
  fragmentMap: OBC.FragmentIdMap;
  camera: { position: THREE.Vector3; target: THREE.Vector3 };
}

export class TodoCreator extends OBC.Component<ToDo[]> implements OBC.UI {
  static uuid = "2953b248-5967-45d3-a692-6365b71d478c";
  enabled = true;
  private _components: OBC.Components;
  private _list: ToDo[] = [];

  uiElement = new OBC.UIElement<{
    activationButton: OBC.Button;
    todoList: OBC.FloatingWindow;
  }>();

  constructor(components: OBC.Components) {
    super(components);
    this._components = components;
    components.tools.add(TodoCreator.uuid, this);
    this.setUI();
  }

  async addToDo(description: string) {
    const camera = this._components.camera;

    if (!(camera instanceof OBC.OrthoPerspectiveCamera)) {
      throw new Error(
        "TodoCreator needs the OrthoPerspectiveCamera in order to work"
      );
    }

    const position = new THREE.Vector3();
    camera.controls.getPosition(position);
    const target = new THREE.Vector3();
    camera.controls.getTarget(target);
    const todoCamera = { position, target };

    const highlighter = await this._components.tools.get(
      OBC.FragmentHighlighter
    );

    const todo: ToDo = {
      description,
      date: new Date(),
      fragmentMap: highlighter.selection.select,
      camera: todoCamera,
    };
    const todoCard = new TodoCard(this._components);
    todoCard.description = todo.description;
    todoCard.date = todo.date;
    todoCard.onCardClick.add(() => {
      camera.controls.setLookAt(
        todo.camera.position.x,
        todo.camera.position.y,
        todo.camera.position.z,
        todo.camera.target.x,
        todo.camera.target.y,
        todo.camera.target.z
      );
      const fragmentMapLength = Object.keys(todo.fragmentMap).length;
      if (fragmentMapLength === 0) return;
      highlighter.highlightByID("select", todo.fragmentMap);
    });
    const todoList = this.uiElement.get("todoList");
    todoList.addChild(todoCard);

    console.log(todo);
  }

  private setUI() {
    const activationButton = new OBC.Button(this._components);
    activationButton.materialIcon = "construction";
    activationButton.tooltip = "To-Do List";

    const form = new OBC.Modal(this._components);
    this._components.ui.add(form);
    form.title = "Create New To-do";

    const descriptionInput = new OBC.TextArea(this._components);
    descriptionInput.label = "Description";
    form.slots.content.addChild(descriptionInput);

    const descriptionForm = form.slots.content.get();
    descriptionForm.style.padding = "20px";
    descriptionForm.style.display = "flex";
    descriptionForm.style.flexDirection = "column";
    descriptionForm.style.rowGap = "20px";

    form.onAccept.add(() => {
      this.addToDo(descriptionInput.value);
      descriptionInput.value = "";
      form.visible = false;
    });

    const newTodoBtn = new OBC.Button(this._components, {
      materialIconName: "add",
      tooltip: "Create To-Do",
    });

    newTodoBtn.onClick.add(() => {
      form.visible = true;
      todoList.visible = true;
    });
    form.onCancel.add(() => (form.visible = false));

    const todoList = new OBC.FloatingWindow(this._components);
    this._components.ui.add(todoList);
    todoList.visible = false;
    todoList.title = "To-Do List";

    const todoWindowBtn = new OBC.Button(this._components, {
      materialIconName: "fact_check",
      tooltip: "Show list",
    });
    activationButton.addChild(newTodoBtn, todoWindowBtn);
    todoWindowBtn.onClick.add(() => (todoList.visible = !todoList.visible));

    this.uiElement.set({ activationButton, todoList });
  }

  get(): ToDo[] {
    return this._list;
  }
}
