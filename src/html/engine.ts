import { GameDto } from "../dto";
import { Game } from "./game";
import { gameView } from "./game-view";

export class Engine {

  private readonly game: Game;

  public constructor(gameDto: GameDto) {
    if (gameDto.players.length === 0) { throw new Error('Game has 0 players.'); }

    window.addEventListener("beforeunload", this.window_onBeforeUnload);

    this.game = new Game(gameDto);
    gameView.hand.buildings = this.game.hand;
    gameView.suburb.suburb = this.game.players[0].suburb;
    gameView.hand.canDrag = true;
  }

  private window_onBeforeUnload(ev: BeforeUnloadEvent): void {
    ev.preventDefault();
    ev.returnValue = '';
  }
}