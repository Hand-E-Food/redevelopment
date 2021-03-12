import { Lot, Suburb } from '../common';
import { Drag } from './drag';
import { Tile } from './tile';

export class LotView {

  private _canDrop: boolean = false;
  public get canDrop(): boolean { return this._canDrop; }
  public set canDrop(value: boolean) {
    if (this._canDrop === value) { return; }
    if (this._canDrop) { this.node.classList.remove('candrop'); }
    this._canDrop = value;
    if (this._canDrop) { this.node.classList.add('candrop'); }
  }

  private _lot: Lot;
  public get lot(): Lot { return this._lot; }
  public set lot(value: Lot) {
    if (!value) { throw new Error('LotView.lot must be defined.')}
    if (this._lot === value) { return; }

    this.tiles.forEach(tile => tile.node.remove());

    this._lot = value;

    this.tiles = this._lot.buildings.map(building => new Tile(building));
    this.tiles.forEach(tile => this.node.appendChild(tile.node), this);
  }

  public readonly node: HTMLElement;

  private tiles: Tile[] = [];

  public readonly x: number;

  public readonly y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    let td = document.createElement('td');
    this.node = td;
    td.ondragover = ev => this.onDragOver(ev);
    td.ondrop = ev => Drag.dropOnLot(this, ev);

    let border: string[] = [];

    if (this.y === Suburb.North) {
      border.push('north');
    } else if (this.y === Suburb.South) {
      border.push('south');
    }

    if (this.x === Suburb.West) {
      td.classList.add('half-lot');
      border.push('west');
    } else if (this.x === Suburb.East) {
      td.classList.add('half-lot');
      border.push('east');
    } else {
      td.classList.add('lot');
    }

    if (border.length > 0) {
      td.classList.add(border.join('-'));
    }
  }

  public addTile(tile: Tile): void {
    if (tile.node.parentElement) { throw new Error('tile.node has a parent'); }
    this.lot.buildings.push(tile.building);
    this.node.appendChild(tile.node);
    tile.onDragStart = (tile, ev) => this.onDragTile(tile, ev);
  }

  public hasTile(tile: Tile): boolean {
    return this.tiles.indexOf(tile) >= 0;
  }

  public removeTile(tile: Tile): void {
    let i = this.lot.buildings.lastIndexOf(tile.building);
    if (i === -1) { return; }
    this.lot.buildings.splice(i, 1);
    tile.node.remove();
    tile.onDragStart = undefined;
  }

  private onDragTile(tile: Tile, ev: DragEvent): boolean {
    return Drag.dragTile(tile, ev,
      dragEvent => this.removeTile(tile),
      dropEvent => Drag.dropOnLot(this, dropEvent)
    )
  }

  private onDragOver(ev: DragEvent): boolean {
    if (!this.canDrop) { return false; }
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
    return true;
  }
}