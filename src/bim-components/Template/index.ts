import * as OBC from "openbim-components";

export class TemplateToolCreator
  extends OBC.Component<null>
  implements OBC.UI, OBC.Disposable
{
  static uuid = "e6c513cc-7c0b-4907-ba4c-a9242b36c1c4"; // copy one from https://www.uuidgenerator.net/
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
    components.tools.add(TemplateToolCreator.uuid, this);
    this.setUI();
  }

  private setUI() {
    const activationButton = new OBC.Button(this._components);
    activationButton.materialIcon = "construction";
    activationButton.tooltip = "Template List";

    const toolWindow = new OBC.FloatingWindow(this._components);
    this._components.ui.add(toolWindow);
    toolWindow.visible = false;
    toolWindow.title = "Template List";

    this.uiElement.set({ activationButton, toolWindow });
  }

  get(): null {
    return null;
  }
}
