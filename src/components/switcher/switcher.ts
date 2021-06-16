import { Content } from '../content/content';
import { Garage } from '../garage/garage';
import { Render } from '../Render';
import { Winners } from '../winners/winners';

export class Switcher extends Render {
  private garageBtn: Render;

  private winnersBtn: Render;

  private content: Content;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['switcher'], '');
    this.garageBtn = new Render(this.element, 'button', ['garage-btn'], 'To Garage');
    this.winnersBtn = new Render(this.element, 'button', ['winners-btn'], 'To winners');
    this.content = new Content(parentNode);

    this.garageBtn.element.addEventListener('click', () => {
      this.content.element.innerHTML = '';
      new Garage(this.content.element);
    });

    this.winnersBtn.element.addEventListener('click', () => {
      this.content.element.innerHTML = '';
      new Winners(this.content.element);
    });
  }
}
