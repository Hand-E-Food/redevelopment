import { Lot } from "./lot";
import { Suburb } from "./suburb";

export interface Condition { (lot: Lot): boolean };

export interface Points {[century: number]: number}

export interface IScoring {
  readonly points: Points;
  readonly text: string;

  score(century: number, suburb: Suburb, x: number, y: number): number;
}

abstract class AScoring implements IScoring {
  public points: Points;
  public text: string;

  public constructor(text: string, points: Points) {
    this.points = points;
    this.text = text;
  }

  public abstract score(century: number, suburb: Suburb, x: number, y: number): number;
}

export class OtherText implements IScoring {
  public points: Points = {};
  public text: string;

  public constructor(text: string) {
    this.text = text;
  }

  public score(century: number, suburb: Suburb, x: number, y: number): number {
    return 0;
  }
}

export class Score extends AScoring {
  public constructor(text: string, points: Points) {
    super(text, points);
  }

  public score(century: number, suburb: Suburb, x: number, y: number): number {
    return this.points[century] ?? 0;
  }
}
export class ScoreIf extends AScoring {
  private readonly condition: Condition;

  public constructor(condition: Condition, text: string, points: Points) {
    super(text, points);
    this.condition = condition;
  }

  public score(century: number, suburb: Suburb, x: number, y: number): number {
    let lot: Lot = suburb.lots[y][x];
    return this.condition(lot)
      ? (this.points[century] ?? 0)
      : 0;
  }
}

export class ScoreForEachAdjacent extends AScoring {
  private readonly condition: Condition;

  public constructor(condition: Condition, text: string, points: Points) {
    super(text, points);
    this.condition = condition;
  }

  public score(century: number, suburb: Suburb, x: number, y: number): number {
    let lots: Lot[] = [
      suburb.lots[y - 1][x],
      suburb.lots[y + 1][x],
      suburb.lots[y][x - 1],
      suburb.lots[y][x + 1],
    ];

    return (this.points[century] ?? 0) * lots.filter(this.condition).length;
  }
}

export class ScoreIfAnyAdjacent extends AScoring {
  private readonly condition: Condition;

  public constructor(condition: Condition, text: string, points: Points) {
    super(text, points);
    this.condition = condition;
  }

  public score(century: number, suburb: Suburb, x: number, y: number): number {
    let lots: Lot[] = [
      suburb.lots[y - 1][x],
      suburb.lots[y + 1][x],
      suburb.lots[y][x - 1],
      suburb.lots[y][x + 1],
    ];

    return lots.find(this.condition)
      ? (this.points[century] ?? 0)
      : 0;
  }
}

export class ScoreIfNotAdjacent extends AScoring {
  private readonly condition: Condition;

  public constructor(condition: Condition, text: string, points: Points) {
    super(text, points);
    this.condition = condition;
  }

  public score(century: number, suburb: Suburb, x: number, y: number): number {
    let lots: Lot[] = [
      suburb.lots[y - 1][x],
      suburb.lots[y + 1][x],
      suburb.lots[y][x - 1],
      suburb.lots[y][x + 1],
    ];

    return lots.find(this.condition)
      ? 0
      : (this.points[century] ?? 0);
  }
}
