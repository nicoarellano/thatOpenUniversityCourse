import * as OBC from "openbim-components";

export class SimpleQTO
  extends OBC.Component<null>
  implements OBC.UI, OBC.Disposable
{
  static uuid = "afaecc6f-d556-43e8-b818-c5e5bb510654";
  enabled = true;
  private _components: OBC.Components;
  uiElement = new OBC.UIElement<{
    activationBtn: OBC.Button;
    qtoList: OBC.FloatingWindow;
  }>();

  setup() {}

  constructor(components: OBC.Components) {
    super(components);
    this._components = components;
    components.tools.add(SimpleQTO.uuid, this);
    this.setUI();
  }

  private setUI() {
    const activationBtn = new OBC.Button(this._components);
    activationBtn.materialIcon = "functions";
    activationBtn.tooltip = "Quantification";

    const qtoList = new OBC.FloatingWindow(this._components);
    this._components.ui.add(qtoList);
    qtoList.visible = false;
    qtoList.title = "Quantification";

    activationBtn.onClick.add(() => {
      activationBtn.active = !activationBtn.active;
      qtoList.visible = activationBtn.active;
    });

    this.uiElement.set({ activationBtn, qtoList });
  }

  async dispose() {
    this.uiElement.dispose();
    this.enabled = false;
  }

  get(): null {
    return null;
  }
}
