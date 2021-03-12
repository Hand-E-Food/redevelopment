import { SuburbDto } from "../dto/suburb-dto";
import { Lot, LotType } from "./lot";

export class Suburb {
  public static readonly Width = 4;
  public static readonly Height = 4;
  public static readonly West = 0;
  public static readonly North = 0;
  public static readonly East = Suburb.Width + 1;
  public static readonly South = Suburb.Height + 1;

  public readonly lots: Lot[][];

  public readonly name: string;

  public constructor(year: number, suburbDto?: SuburbDto) {
    this.lots = Array<Lot[]>(Suburb.Height + 2);
    for(let y = Suburb.North; y <= Suburb.South; y++) {
      let row = Array<Lot>(Suburb.Width + 2);
      this.lots[y] = row;
      for(let x = Suburb.West; x <= Suburb.East; x++) {
        let type: LotType;
        if (x === Suburb.West || x == Suburb.East) {
          if (y === Suburb.North || y === Suburb.South) {
            type = LotType.corner; // Corner
          } else {
            type = LotType.border; // East/West
          }
        } else {
          if (y === Suburb.North) {
            type = LotType.border; // North
          } else if (y === Suburb.South) {
            type = LotType.ocean; // South
          } else {
            type = LotType.land; // Center
          }
        }
        let lot = new Lot(x, y, type, suburbDto?.lots[y][x]);
        row[x] = lot;
        if (this.isSubmerged(year, y)) {
          lot.submerge();
        }
      }
    }
  }

  private isSubmerged(year: number, y: number): boolean {
    return y === Suburb.Height
      || (year >= 2250 && y === Suburb.Height - 1)
  }

  public score(century: number): number {
    let points: number = 0;
    for (let y = 1; y <= Suburb.Height; y++ ) {
      let row = this.lots[y];
      for (let x = 1; x <= Suburb.Width; x++ ) {
        let cards = row[x].buildings;
        for (let i = 0; i < cards.length; i++) {
          let scorings = cards[i].scorings;
          for (let j = 0; j < scorings.length; j++) {
            scorings[j].score(century, this, x, y);
          }
        }
      }
    }
    return points;
  }

  public toDto(): SuburbDto {
    return {
      lots: this.lots.map(row => row.map(lot => lot.toDto())),
      name: this.name,
    };
  }
}