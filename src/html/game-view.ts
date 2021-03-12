import { CardView } from "./card-view";
import { HandView } from "./hand-view";
import { SuburbView } from "./suburb-view";

export class GameView {

  public readonly card: CardView = new CardView();

  public readonly hand: HandView = new HandView();

  public readonly suburb: SuburbView = new SuburbView();

  public readonly node: HTMLElement;

  public constructor() {
    let table = document.createElement('table');
    this.node = table;
    table.classList.add('game');

    let tr1 = document.createElement('tr');
    table.appendChild(tr1);

    let suburbTd = document.createElement('td');
    tr1.appendChild(suburbTd);
    suburbTd.rowSpan = 2;
    suburbTd.appendChild(this.suburb.node);

    let cardViewTd = document.createElement('td');
    tr1.appendChild(cardViewTd);
    cardViewTd.appendChild(this.card.node);

    let tr2 = document.createElement('tr');
    table.appendChild(tr2);

    let scoresTd = document.createElement('td');
    tr2.appendChild(scoresTd);
    scoresTd.appendChild(document.createTextNode('Scores'));
    
    let tr3 = document.createElement('tr');
    table.appendChild(tr3);
    
    let handTd = document.createElement('td');
    tr3.appendChild(handTd);
    handTd.colSpan = 2;
    handTd.appendChild(this.hand.node);
  }
}

export var gameView = new GameView();