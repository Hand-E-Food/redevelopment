import { LotDto } from "../dto";
import { Building, Buildings } from "./building";

export enum LotType {
  border,
  corner,
  land,
  ocean,
  water,
}

export class Lot {

  private _buildings: Building[] = [];
  public get buildings(): Building[] { return this._buildings; };
  public set buildings(value: Building[]) { this._buildings = value ?? []; }

  private _type: LotType;
  public get type(): LotType { return this._type; }

  public readonly x: number;

  public readonly y: number;

  public constructor(x: number, y: number, type: LotType, dto?: LotDto) {
    this._buildings = dto?.map(id => Buildings[id]);
    this._type = type;
    this.x = x;
    this.y = y;
  }

  public canPlace(building: Building): boolean {
    switch (this.type) {
      case LotType.land:
        break;
      case LotType.water:
        if (!building.isAmphibious) { return false; }
        break;
      default:
        return false;
    }

    if (this.buildings.find(b => b.century >= building.century)) {
      return false;
    }

    if (building.isImprovement && this.buildings.length !== 1) {
      return false;
    }

    return true;
  }

  public submerge() {
    if (this.type !== LotType.land) { return; }
    for (let i = 0; i < this.buildings.length; i++) {
      if (this.buildings[i].isAmphibious) {
        return;
      }
    }
    this.buildings = [];
    this._type = LotType.water;
  }

  public toDto(): LotDto { return this.buildings.map(building => building.toDto()); }
}