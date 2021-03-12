import { PlayerDto } from ".";

export interface GameDto {
  readonly hand?: string[];
  readonly players: PlayerDto[];
  readonly year: number;
}