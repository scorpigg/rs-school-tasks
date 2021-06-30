import { Render } from '../../../Render';

export class GameSwitcher extends Render {
  private switchBtn: Render;

  private switchInput: Render;

  private switchText: Render;

  private switchHandle: Render;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', ['game-switcher']);
    this.switchBtn = new Render(this.element, 'label', ['switch__btn']);
    this.switchInput = new Render(this.switchBtn.element, 'input', ['switch__input']);
    this.switchInput.element.setAttribute('type', 'checkbox');
    this.switchText = new Render(this.switchBtn.element, 'span', ['switch__text']);
    this.switchHandle = new Render(this.switchBtn.element, 'span', ['switch__handle']);
  }
}
