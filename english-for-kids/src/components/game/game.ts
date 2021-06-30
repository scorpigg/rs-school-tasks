import {
  chooseCategory, viewNavigation, renderMainCards, switchGameMode,
} from '../../services/game.service';
import { Render } from '../Render';
import { Cards } from './cards/cards';
import { Header } from './header/header';
// import state from './state';

export class Game extends Render {
  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', ['game']);
    new Header(this.element);
    new Cards(this.element);
    renderMainCards();
    chooseCategory();
    viewNavigation();
    switchGameMode();
  }
}
