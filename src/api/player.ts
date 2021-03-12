import { PlayerDto } from "../dto";
import { Suburb } from "../common";

export class Player {
  
  public hand: string[];

  public password: string;

  public suburb: Suburb;

  public toDto(): PlayerDto {
    return {
      suburb: this.suburb.toDto(),
    };
  }
}