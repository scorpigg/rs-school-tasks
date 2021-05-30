import './best-score.scss';
import { Render } from '../Render';

export class BestScore extends Render {
  private title: Render;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', ['best-score', 'content-container'], '');
    this.title = new Render(this.element, 'h2', ['best-score__title'], 'Best players');
  }
}
