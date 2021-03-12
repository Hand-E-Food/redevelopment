import { Building, Buildings } from "../common";
import { GameDto } from "../dto";
import { Player } from './player';
import { PlayerAction } from "./player-action";

export class Game {

  public action: PlayerAction | undefined;

  public readonly centry: number;

  public readonly hand: Building[];

  public readonly players: Player[];

  public readonly year: number;

  public constructor(gameDto: GameDto) {
    this.centry = Math.ceil(gameDto.year / 100);
    this.hand = gameDto.hand.map(id => Buildings[id]);
    this.players = gameDto.players.map(playerDto => new Player(gameDto.year, playerDto))
    this.year = gameDto.year;
  }
}