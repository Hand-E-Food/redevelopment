import { GameDto, PlayerDto } from "../dto";
import { Deck } from "./deck";
import { Player } from "./player";

export class Game {

  public century: number;

  public deck: Deck;

  public players: Player[];

  public year: number;

  public toDto(playerIndex: number): GameDto {
    if (playerIndex < 0 || playerIndex >= this.players.length) {
      throw new Error('playerIndex is out of range.');
    }
    let players = Array<PlayerDto>(this.players.length);
    for(let i = 0; i < players.length; i++) {
      players[i] = this.players[(playerIndex + i) % players.length].toDto();
    }
    return {
      hand: this.players[playerIndex].hand,
      players: players,
      year: this.year,
    };
  }
}