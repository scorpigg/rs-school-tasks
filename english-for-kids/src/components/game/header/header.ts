import { Render } from '../../Render';
import { GameSwitcher } from './game-switcher/game-switcher';
import { Navigation } from './navigation/navigation';

export class Header extends Render {
  constructor(parentNode:HTMLElement) {
    super(parentNode, 'header', ['header']);
    new Navigation(this.element);
    new GameSwitcher(this.element);
  }
}
