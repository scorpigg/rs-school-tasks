/* eslint-disable no-console */
import { renderWinners } from '../../services/winners.services';
import { Render } from '../Render';
import { WinnersPagination } from './winners-pagination/winners-pagination';

export class Winners extends Render {
  private winnersPagination: WinnersPagination;

  private winnersContainer: Render;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['winners'], '');
    this.winnersContainer = new Render(this.element, 'div', ['winners-container'], '');
    this.winnersPagination = new WinnersPagination(this.element);
    renderWinners().catch(() => console.log('No winners'));
  }
}
