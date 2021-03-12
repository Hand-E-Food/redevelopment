import { Building, Centuries } from '../common';
import { gameView } from './game-view';
import { Icon } from './icon';

export class Tile {
  
  public readonly building: Building;

  public get canDrag(): boolean { return this.node.draggable; }
  public set canDrag(value: boolean) {
    if (this.node.draggable === value) { return; }
    this.node.draggable = value;
    if (value) {
      this.node.classList.add('selected');
    } else {
      this.node.classList.remove('selected');
    }
  }

  public readonly node: HTMLElement;

  public onDragStart: {(tile: Tile, ev: DragEvent): boolean};

  public constructor(building: Building) {
    this.building = building;

    let outerDiv = document.createElement('div');
    this.node = outerDiv;
    outerDiv.classList.add('tile');
    outerDiv.style.backgroundColor = Centuries[building.century].backColor;
    outerDiv.ondragstart  = ev => this.onDragStart ? this.onDragStart(this, ev) : true;
    outerDiv.onmouseenter = ev => gameView.card.building = building;
    outerDiv.onmouseleave = ev => gameView.card.building = undefined;

    let tileIcon = Icon.for(building.type.name);
    if (tileIcon) {
      outerDiv.appendChild(tileIcon);
      tileIcon.classList.add('tile');
    }
    else
    {
      let innerDiv = document.createElement('div');
      outerDiv.appendChild(innerDiv);
      innerDiv.style.backgroundColor = building.type.backColor;

      let span = document.createElement('span');
      innerDiv.appendChild(span);
      span.classList.add('tile');
      
      let tileText = document.createTextNode(building.name);
      span.appendChild(tileText);
    }
  }
}