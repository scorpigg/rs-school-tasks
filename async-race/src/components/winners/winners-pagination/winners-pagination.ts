import { nextWinnersPage, prevWinnersPage } from '../../../services/winners.services';
import { Render } from '../../Render';

export class WinnersPagination extends Render {
  private nextBtn: Render;

  private prevBtn: Render;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['cars-pagination'], '');
    this.prevBtn = new Render(this.element, 'button', ['prev-btn'], 'Prev');
    this.nextBtn = new Render(this.element, 'button', ['next-btn'], 'Next');

    this.nextBtn.element.addEventListener('click', () => {
      nextWinnersPage();
    });
    this.prevBtn.element.addEventListener('click', () => {
      prevWinnersPage();
    });
  }
}
