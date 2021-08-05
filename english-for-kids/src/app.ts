import { Admin } from './components/admin/admin';
import { Game } from './components/game/game';

export class App {
  constructor(readonly parentNode: HTMLElement) {
    // new Game(parentNode);
    new Admin(parentNode);
  }
}
