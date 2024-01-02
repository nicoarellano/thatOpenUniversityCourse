import * as OBC from "openbim-components";

export class SimpleQTO
  extends OBC.Component<null>
  implements OBC.UI, OBC.Disposable
{
  static uuid = "3e2f0577-c7f6-4280-922a-dad167a58c9e";
  enabled = true;
  private _components: OBC.Components;
  uiElement = new OBC.UIElement<{
    activationButton: OBC.Button;
    toolWindow: OBC.FloatingWindow;
  }>();

  setup() {}

  async dispose() {
    this.uiElement.dispose();
    this.enabled = false;
  }

  constructor(components: OBC.Components) {
    super(components);
    this._components = components;
    components.tools.add(SimpleQTO.uuid, this);
    this.setUI();
  }

  private setUI() {
    const activationButton = new OBC.Button(this._components);
    activationButton.materialIcon = "construction";
    activationButton.tooltip = "QTO List";

    const toolWindow = new OBC.FloatingWindow(this._components);
    this._components.ui.add(toolWindow);
    toolWindow.visible = false;
    toolWindow.title = "QTO List";

    this.uiElement.set({ activationButton, toolWindow });
  }

  get(): null {
    return null;
  }
}
