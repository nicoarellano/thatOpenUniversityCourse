import * as OBC from "openbim-components";
import * as WEBIFC from "web-ifc";
import { FragmentsGroup } from "bim-fragment";

type QtoResult = { [setName: string]: { [qtoName: string]: number } };

// const sum = {
//   Qto_WallBaseQuantities: {
//     volume: 20,
//     area: 30,
//   },
// };

export class SimpleQTO
  extends OBC.Component<QtoResult>
  implements OBC.UI, OBC.Disposable
{
  static uuid = "afaecc6f-d556-43e8-b818-c5e5bb510654";
  enabled = true;
  private _components: OBC.Components;
  private _qtoResult: QtoResult = {};
  uiElement = new OBC.UIElement<{
    activationBtn: OBC.Button;
    qtoList: OBC.FloatingWindow;
  }>();

  async setup() {
    const highlighter = await this._components.tools.get(
      OBC.FragmentHighlighter
    );
    highlighter.events.select.onHighlight.add((fragmentIdMap) => {
      this.sumQuantities(fragmentIdMap);
    });
    highlighter.events.select.onClear.add(() => {
      this.resetQuantities();
    });
  }

  resetQuantities() {
    this._qtoResult = {};
  }

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

  async sumQuantities(fragmentIdMap: OBC.FragmentIdMap) {
    const fragmentManager = await this._components.tools.get(
      OBC.FragmentManager
    );
    const propertiesProcessor = await this._components.tools.get(
      OBC.IfcPropertiesProcessor
    );
    for (const fragmentID in fragmentIdMap) {
      const fragment = fragmentManager.list[fragmentID];
      const model = fragment.mesh.parent;
      if (!(model instanceof FragmentsGroup && model.properties)) continue;
      const properties = model.properties;
      const modelIndexMap = propertiesProcessor.get()[model.uuid];
      if (!modelIndexMap) continue;
      const expressIDs = fragmentIdMap[fragmentID];
      for (const expressID of expressIDs) {
        const entityMap = modelIndexMap[Number(expressID)];
        if (!entityMap) continue;
        for (const mapID of entityMap) {
          const entity = properties[mapID];
          const { name: setName } = OBC.IfcPropertiesUtils.getEntityName(
            properties,
            mapID
          );
          if (entity.type !== WEBIFC.IFCELEMENTQUANTITY || !setName) continue;
          if (!(setName in this._qtoResult)) {
            this._qtoResult[setName] = {};
            OBC.IfcPropertiesUtils.getQsetQuantities(
              properties,
              mapID,
              (qtoID) => {
                const { name: qtoName } = OBC.IfcPropertiesUtils.getEntityName(
                  properties,
                  qtoID
                );
                const { value } = OBC.IfcPropertiesUtils.getQuantityValue(
                  properties,
                  qtoID
                );
                if (!(qtoName && value)) return;
                if (!(qtoName in this._qtoResult[setName]))
                  this._qtoResult[setName][qtoName] += value;
              }
            );
          }
        }
      }
      // console.log(this._qtoResult);
    }
  }

  async dispose() {
    this.uiElement.dispose();
    this.enabled = false;
    this.resetQuantities();
  }

  get(): QtoResult {
    return this._qtoResult;
  }
}
