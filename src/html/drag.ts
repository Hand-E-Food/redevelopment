import { gameView } from "./game-view";
import { LotView } from "./lot-view";
import { Tile } from "./tile";

export class Drag {

  private static cancel?: {(dropEvent: DragEvent): void} = undefined;

  private static draggedTile?: Tile = undefined;

  public static dragTile(
    tile: Tile,
    ev: DragEvent,
    start: {(dragEvent: DragEvent): void},
    cancel: {(dropEvent: DragEvent): void}
  ): boolean {
    console.log('dragstart');
    if (!tile.canDrag) { return false; }
    
    this.cancel = cancel;
    this.draggedTile = tile;
    ev.dataTransfer.effectAllowed = 'move';

    window.addEventListener('drag', ev => {
      console.log('drag');
      start(ev);
      gameView.hand.canDrag = false;
      this.enableCanDrop(tile);
    }, { once: true, passive: true });

    window.addEventListener('drop', ev => {
      console.log('dropElsewhere');
      if (this.cancel) { this.cancel(ev); }
      ev.stopPropagation();
      return true;
    }, { once: true });

    window.addEventListener('dragend', ev => {
      console.log('dragend');
      this.cancel = undefined;
      this.draggedTile = undefined;
      this.disableCanDrop();
      return true;
    }, { once: true, passive: true });

    return true;
  }

  public static dropOnHand(ev: DragEvent): boolean {
    console.log('dropOnHand');
    if (!this.draggedTile) { return false; }
    this.dropTile(ev);
    gameView.hand.addTile(this.draggedTile);
    gameView.hand.canDrag = true;
    return true;
  }

  public static dropOnLot(lotView: LotView, ev: DragEvent): boolean {
    console.log('dropOnLot');
    if (!this.draggedTile
      || !lotView.canDrop
      || !lotView.lot.canPlace(this.draggedTile.building)
    ) {
      return false;
    }
    this.dropTile(ev);
    lotView.addTile(this.draggedTile);
    this.draggedTile.canDrag = true;
    return true;
  }

  private static dropTile(ev: DragEvent): void {
    this.cancel = undefined;
    this.draggedTile.node.remove();
    ev.stopPropagation();
  }

  private static enableCanDrop(tile: Tile): void {
    gameView.hand.canDrop = true;
    gameView.suburb.lots.forEach(row => row.forEach(lotView => {
      lotView.canDrop = lotView.lot.canPlace(tile.building);
    }));
  }

  private static disableCanDrop(): void {
    gameView.hand.canDrop = false;
    gameView.suburb.lots.forEach(row => row.forEach(lotView => {
      lotView.canDrop = false;
    }));
  }
}

window.addEventListener('selectstart', ev => ev.preventDefault());