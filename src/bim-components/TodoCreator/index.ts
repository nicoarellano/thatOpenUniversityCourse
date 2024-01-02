import * as OBC from "openbim-components";
import * as THREE from "three";
import { TodoCard } from "./src/TodoCard";

type ToDoPriority = "Low" | "Normal" | "High";
interface ToDo {
  id: string;
  description: string;
  date: Date;
  fragmentMap: OBC.FragmentIdMap;
  camera: { position: THREE.Vector3; target: THREE.Vector3 };
  priority: ToDoPriority;
}
export class TodoCreator
  extends OBC.Component<ToDo[]>
  implements OBC.UI, OBC.Disposable
{
  static uuid = "2953b248-5967-45d3-a692-6365b71d478c";
  onProjectCreated = new OBC.Event<ToDo>();
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

  async dispose() {
    this.uiElement.dispose();
    this._list = [];
    this.enabled = false;
  }

  async setup() {
    const highlighter = await this._components.tools.get(
      OBC.FragmentHighlighter
    );
    highlighter.add(`${TodoCreator.uuid}-priority-Low`, [
      new THREE.MeshStandardMaterial({ color: 0x59bc59 }),
    ]);
    highlighter.add(`${TodoCreator.uuid}-priority-Normal`, [
      new THREE.MeshStandardMaterial({ color: 0x597cff }),
    ]);
    highlighter.add(`${TodoCreator.uuid}-priority-High`, [
      new THREE.MeshStandardMaterial({ color: 0xff7676 }),
    ]);
  }

  deleteToDo(id: string) {
    const newList = this._list.filter((todo) => todo.id !== id);
    this._list = newList;
    console.log(this._list);
  }

  async addToDo(description: string, priority: ToDoPriority) {
    if (!this.enabled) return;

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
      id: crypto.randomUUID(),
      description,
      date: new Date(),
      fragmentMap: highlighter.selection.select,
      camera: todoCamera,
      priority,
    };

    this._list.push(todo);

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
        todo.camera.target.z,
        true
      );
      const fragmentMapLength = Object.keys(todo.fragmentMap).length;
      if (fragmentMapLength === 0) return;
      highlighter.highlightByID("select", todo.fragmentMap);
    });
    const todoList = this.uiElement.get("todoList");
    todoList.addChild(todoCard);
    this.onProjectCreated.trigger(todo);

    todoCard.onDeleteClick.add(() => {
      todoCard.dispose();
      const newTodoList = this._list.filter((item) => item.id !== todo.id);
      this._list = newTodoList;
    });
  }

  private async setUI() {
    const activationButton = new OBC.Button(this._components);
    activationButton.materialIcon = "construction";
    activationButton.tooltip = "To-Do List";

    const form = new OBC.Modal(this._components);
    this._components.ui.add(form);
    form.title = "Create New To-do";

    const descriptionInput = new OBC.TextArea(this._components);
    descriptionInput.label = "Description";
    form.slots.content.addChild(descriptionInput);

    const priorityDropdown = new OBC.Dropdown(this._components);
    priorityDropdown.label = "Priority";
    priorityDropdown.addOption("Low", "Normal", "High");
    priorityDropdown.value = "Normal";
    form.slots.content.addChild(priorityDropdown);

    const descriptionForm = form.slots.content.get();
    descriptionForm.style.padding = "20px";
    descriptionForm.style.display = "flex";
    descriptionForm.style.flexDirection = "column";
    descriptionForm.style.rowGap = "20px";

    const acceptTodo = () => {
      this.addToDo(
        descriptionInput.value,
        priorityDropdown.value as ToDoPriority
      );
      descriptionInput.value = "";
      priorityDropdown.value = "Normal";
      form.visible = false;
    };

    form.onAccept.add(() => {
      acceptTodo();
    });

    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.code === "Enter" && form.visible) {
        acceptTodo();
      }
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

    const todoListToolbar = new OBC.SimpleUIComponent(this._components);
    todoList.addChild(todoListToolbar);

    const colorizeBtn = new OBC.Button(this._components);
    colorizeBtn.materialIcon = "format_color_fill";
    todoListToolbar.addChild(colorizeBtn);

    const highlighter = await this._components.tools.get(
      OBC.FragmentHighlighter
    );

    colorizeBtn.onClick.add(() => {
      colorizeBtn.active = !colorizeBtn.active;
      if (colorizeBtn.active) {
        for (const todo of this._list) {
          const fragmentMapLength = Object.keys(todo.fragmentMap).length;
          if (fragmentMapLength === 0) return;
          highlighter.highlightByID(
            `${TodoCreator.uuid}-priority-${todo.priority}`,
            todo.fragmentMap
          );
        }
      } else {
        highlighter.clear(`${TodoCreator.uuid}-priority-Low`);
        highlighter.clear(`${TodoCreator.uuid}-priority-Normal`);
        highlighter.clear(`${TodoCreator.uuid}-priority-High`);
      }
    });

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
