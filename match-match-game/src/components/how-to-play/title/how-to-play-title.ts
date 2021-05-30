import { Render } from '../../Render';
import './title.scss';

export class HowToPlayTitle extends Render {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'h2', ['how-to-play__title'], 'How to play?');
  }
}
