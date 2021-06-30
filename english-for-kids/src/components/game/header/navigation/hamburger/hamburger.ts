import { Render } from '../../../../Render';

export class Hamburger extends Render {
  private hamburgerCheckbox: Render;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', ['hamburger']);
    this.hamburgerCheckbox = new Render(this.element, 'input', ['hamburger__checkbox']);
    this.hamburgerCheckbox.element.setAttribute('type', 'checkbox');
    new Render(this.element, 'span', ['hamburger__line']);
  }
}
