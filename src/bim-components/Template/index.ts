import * as OBC from "openbim-components";

export class TemplateToolCreator
  extends OBC.Component<null>
  implements OBC.UI, OBC.Disposable
{
  // use the Generate UUID extension (right click > Generate UUID at cursor) or copy one from https://www.uuidgenerator.net/
  static uuid = "e6c513cc-7c0b-4907-ba4c-a9242b36c1c4";
  enabled = true;
  private _components: OBC.Components;
  uiElement = new OBC.UIElement<{
    activationBtn: OBC.Button;
    toolWindow: OBC.FloatingWindow;
  }>();

  setup() {}

  constructor(components: OBC.Components) {
    super(components);
    this._components = components;
    components.tools.add(TemplateToolCreator.uuid, this);
    this.setUI();
  }

  private setUI() {
    const activationBtn = new OBC.Button(this._components);
    activationBtn.materialIcon = "functions";
    activationBtn.tooltip = "Tooltip message";

    const toolWindow = new OBC.FloatingWindow(this._components);
    this._components.ui.add(toolWindow);
    toolWindow.visible = false;
    toolWindow.title = "Title";

    activationBtn.onClick.add(() => {
      activationBtn.active = !activationBtn.active;
      toolWindow.visible = activationBtn.active;
    });

    this.uiElement.set({ activationBtn, toolWindow });
  }

  async dispose() {
    this.uiElement.dispose();
    this.enabled = false;
  }

  get(): null {
    return null;
  }
}
