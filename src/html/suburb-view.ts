import { Suburb } from "../common";
import { LotView } from "./lot-view";

export class SuburbView {

  public readonly lots: LotView[][];
  
  public readonly node: HTMLElement;

  private _suburb: Suburb;
  public get suburb(): Suburb { return this._suburb; }
  public set suburb(value: Suburb) {
    if (!value) { throw new Error('SuburbView.suburb must be defined.'); }
    if (this._suburb === value) { return; }

    this._suburb = value;

    this._suburb.lots.forEach(row => row.forEach(lot => this.lots[lot.y][lot.x].lot = lot));
  }

  public constructor() {
    let table = document.createElement('table');
    this.node = table;
    table.classList.add('suburb');

    let terrainClasses = [ 'land', 'land', 'land', 'beach', 'water', 'water' ];
    this.lots = Array<LotView[]>(Suburb.Height + 2);

    for(let y = Suburb.North; y <= Suburb.South; y++) {
 
      let edgeClass = (y === Suburb.North || y === Suburb.South) ? 'border' : 'suburb';
      let terrainClass = terrainClasses.shift();

      let tr = document.createElement('tr');
      table.appendChild(tr);
      tr.classList.add(edgeClass, terrainClass);

      let boardRow: LotView[] = Array<LotView>(Suburb.Width + 2);
      this.lots[y] = boardRow;
 
      for (let x = Suburb.West; x <= Suburb.East; x++) {
        let cell: LotView = new LotView(x, y);
        boardRow[x] = cell;
        tr.appendChild(cell.node);
      }
    }
  }
}