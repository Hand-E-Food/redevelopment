import { Suburb } from "../common";
import { PlayerDto } from "../dto";

export class Player {
  public readonly suburb: Suburb;

  public constructor(year: number, playerDto: PlayerDto) {
    this.suburb = new Suburb(year, playerDto.suburb);
  }
}