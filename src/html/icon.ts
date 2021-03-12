import { BuildingType, BuildingTypes, Centuries } from "../common";

export class Icon {

  private static nodes: { [buildingType: string]: HTMLElement } = {};

  private constructor() { }

  public static for(name: string): HTMLElement {
    return this.nodes[name]?.cloneNode(true) as HTMLElement;
  }

  public static loadIcons(): Promise<void[]> {
    var promise = Promise.all(Object.values(BuildingTypes).map(this.loadIcon, this));

    Object.values(Centuries).forEach(century => {
      let node = document.createElement('span');
      node.style.backgroundColor = century.backColor;
      node.style.color = century.textColor;
      node.appendChild(document.createTextNode(century.text));
      this.nodes[century.text] = node;
    });

    return promise;
  }

  private static loadIcon(buildingType: BuildingType): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('GET', `images/${buildingType.name}.svg`, true);
      request.overrideMimeType('image/svg+xml');
      request.onloadend = function(ev: ProgressEvent<EventTarget>) {
        let node: HTMLElement;
        if (this.status && this.status >= 200 && this.status < 300) {
          node = request.responseXML.documentElement;
          node.style.fill = buildingType.backColor;
        } else {
          node = document.createElement('span');
          node.style.backgroundColor = buildingType.backColor;
          node.appendChild(document.createTextNode(buildingType.name));
        }
        Icon.nodes[buildingType.name] = node;
        resolve(); 
      }
      request.send();
    });
  }
}