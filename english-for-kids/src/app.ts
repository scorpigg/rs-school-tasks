import { Game } from './components/game/game';

export class App {
  game: Game;

  constructor(readonly parentNode: HTMLElement) {
    this.game = new Game(parentNode);
  }
}
