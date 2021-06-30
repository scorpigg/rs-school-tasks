import { Render } from '../../Render';

export class Cards extends Render {
  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', ['cards']);
  }
}
