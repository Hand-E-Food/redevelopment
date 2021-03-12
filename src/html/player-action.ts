import { Building } from "../common";

export interface PlayerAction {
  readonly building: Building;
  readonly x: number;
  readonly y: number;
}