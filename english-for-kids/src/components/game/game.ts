import {
  chooseCategory, viewNavigation, renderMainCards, switchGameMode, login,
} from '../../services/game.service';
import { Render } from '../Render';
import { AuthForm } from './auth-form/auth-form';
import { Cards } from './cards/cards';
import { Header } from './header/header';
import { ModalOverlay } from './modal-overlay/modal-overlay';

export class Game extends Render {
  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', ['game']);
    new Header(this.element);
    new Cards(this.element);
    new AuthForm(this.element);
    new ModalOverlay(this.element);
    renderMainCards();
    chooseCategory();
    viewNavigation();
    switchGameMode();
    login();
  }
}
