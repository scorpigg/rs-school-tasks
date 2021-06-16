import { Garage } from '../garage/garage';
import { Render } from '../Render';

export class Content extends Render {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['content'], '');
    new Garage(this.element);
  }
}
