import { Building } from "../common";
import { Drag } from "./drag";
import { Tile } from "./tile";

export class HandView {
  
  private _buildings: Building[] = [];
  public get buildings(): Building[] { return this._buildings; }
  public set buildings(value: Building[]) {
    while(this.node.firstChild) {
      this.node.firstChild.remove();
    }
    this._buildings = value ?? [];
    this.tiles = this._buildings.map((building, i) => new Tile(building));
    this.tiles.forEach(this.addTile, this);
  }

  public set canDrag(value: boolean) {
    this.tiles.forEach(tile => tile.canDrag = value);
  }

  private _canDrop: boolean = false;
  public get canDrop(): boolean { return this._canDrop; }
  public set canDrop(value: boolean) {
    if (this._canDrop === value) { return; }
    if (this._canDrop) { this.node.classList.remove('candrop'); }
    this._canDrop = value;
    if (this._canDrop) { this.node.classList.add('candrop'); }
  }

  public readonly node: HTMLElement;

  private tiles: Tile[] = [];

  public constructor() {
    let containerDiv = document.createElement('div');
    this.node = containerDiv;
    containerDiv.classList.add('hand');
    containerDiv.ondragover = ev => this.onDragOver(ev);
    containerDiv.ondrop = ev => Drag.dropOnHand(ev);
  }

  public addTile(tile: Tile): void {
    if (this.tiles.indexOf(tile) === -1) { return; }
    this.tiles.push(tile);
    this.node.appendChild(tile.node);
    tile.onDragStart = (tile, ev) => this.onDragTile(tile, ev);
  }

  public removeTile(tile: Tile): void {
    let i = this.tiles.indexOf(tile);
    if (i === -1) { return; }
    this.tiles.splice(i, 1);
    tile.node.remove();
    tile.onDragStart = undefined;
  }

  private onDragTile(tile: Tile, ev: DragEvent): boolean {
    return Drag.dragTile(tile, ev,
      dragEvent => this.removeTile(tile),
      dropEvent => Drag.dropOnHand(dropEvent)
    );
  }

  private onDragOver(ev: DragEvent): boolean {
    if (!this.canDrop) { return false; }
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
    return true;
  }
}