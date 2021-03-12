import { Building, Centuries } from "../common";
import { Icon } from "./icon";

export class CardView {
  private _building: Building | undefined = undefined;
  public get building(): Building | undefined { return this._building; }
  public set building(value: Building | undefined) {
    if (value === this._building) { return; }
    this.node.firstChild?.remove();
    this._building = value;
    if (value) {
      this.node.appendChild(this.createCard(value));
    }
  }

  public readonly node: HTMLElement;

  public constructor() {
    let containerDiv = document.createElement('div');
    this.node = containerDiv;
    containerDiv.classList.add('card-container');
  }

  private createCard(building: Building): HTMLElement {
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.style.borderColor = Centuries[building.century].backColor;

    let cardImage = document.createElement('img');
    cardDiv.appendChild(cardImage);
    cardImage.classList.add('card-image');
    cardImage.src = `images/${building.id}.jpg`;

    let cardIcon = Icon.for(building.type.name);
    if (cardIcon) {
      cardDiv.appendChild(cardIcon);
      cardIcon.classList.add('card-icon');
      cardIcon.style.fill = building.type.backColor;
    }

    let cardNameDiv = document.createElement('div');
    cardDiv.appendChild(cardNameDiv);
    cardNameDiv.classList.add('card-name');

    let cardNameSpan = document.createElement('span');
    cardNameDiv.appendChild(cardNameSpan);
    cardNameSpan.classList.add('card-name');
    
    let cardNameText = document.createTextNode(building.name);
    cardNameSpan.appendChild(cardNameText);

    let cardScoringsTable = document.createElement('table');
    cardDiv.appendChild(cardScoringsTable);
    cardScoringsTable.classList.add('card-scorings');

    building.scorings.forEach(scoring => {
      let cardScoringsRow = document.createElement('tr');
      cardScoringsTable.appendChild(cardScoringsRow);
      cardScoringsRow.classList.add('card-scorings');

      let cardScoringTextCell = document.createElement('td');
      cardScoringsRow.appendChild(cardScoringTextCell);
      cardScoringTextCell.classList.add('card-scorings-text');

      for(let i = 0, j = 0; i < scoring.text.length;) {
        j = scoring.text.indexOf('[', i);
        if (j < 0) { j = scoring.text.length; }
        cardScoringTextCell.appendChild(document.createTextNode(scoring.text.substring(i, j)));
        i = j;
        
        j = scoring.text.indexOf(']', i);
        if (j >= 0) {
          let iconName = scoring.text.substring(i + 1, j);
          i = j + 1;
          let iconElement: Node = Icon.for(iconName);
          if (!iconElement) {
            iconElement = document.createTextNode(iconName);
          }
          cardScoringTextCell.appendChild(iconElement);
        } else {
          j = scoring.text.length;
          cardScoringTextCell.appendChild(document.createTextNode(scoring.text.substring(i, j)));
          i = j;
        }
      }

      if (Object.keys(scoring.points).length > 0) {

        let cardScoringPointsCell = document.createElement('td');
        cardScoringsRow.appendChild(cardScoringPointsCell);
        cardScoringPointsCell.classList.add('card-scorings-points');

        let cardScoringScoreTable = document.createElement('table');
        cardScoringPointsCell.appendChild(cardScoringScoreTable);
        cardScoringScoreTable.classList.add('card-points')

        let cardScoringScoreRow = document.createElement('tr');
        cardScoringScoreTable.appendChild(cardScoringScoreRow);
        cardScoringScoreRow.classList.add('card-points')

        for (const century in scoring.points) {
          let points: number = scoring.points[century];

          let cardScoringPointsCell = document.createElement('td');
          cardScoringScoreRow.appendChild(cardScoringPointsCell);
          cardScoringPointsCell.classList.add('card-points');
          cardScoringPointsCell.style.backgroundColor = Centuries[century].backColor;
          cardScoringPointsCell.style.color = Centuries[century].textColor;

          let cardScoringPointsText = document.createTextNode(points.toString());
          cardScoringPointsCell.appendChild(cardScoringPointsText);
        };

      } else {

        cardScoringTextCell.colSpan = 2;

      }
    }, this);

    return cardDiv;
  }
}