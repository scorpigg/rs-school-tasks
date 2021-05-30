import './header-right.scss';
import { Render } from '../../Render';
import { showModal } from '../../../services/modal.service';

export class HeaderRight extends Render {
  registrationBtn: Render;

  startGameBtn: Render;

  stopGameBtn: Render;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['header__right'], '');
    this.registrationBtn = new Render(this.element, 'a', ['header__btn', 'registration-btn'], 'Register new player');
    this.startGameBtn = new Render(this.element, 'a', ['header__btn', 'hidden', 'start-btn'], 'Start game');
    this.stopGameBtn = new Render(this.element, 'a', ['header__btn', 'hidden', 'stop-btn'], 'Stop game');

    this.startGameBtn.element.setAttribute('href', '#/game');

    this.registrationBtn.element.addEventListener('click', () => {
      const registrationForm: HTMLElement | null = document.querySelector('.form-registration');
      if (registrationForm) {
        showModal(registrationForm);
      }
    });
  }
}
