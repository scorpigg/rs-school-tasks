import { Render } from '../../Render';
import './card.scss';

const FLIP_CLASS = 'flipped';

export class Card extends Render {
  constructor(readonly image: string) {
    super(null, 'div', ['card-container'], '');
    this.element.innerHTML = `
      <div class="card">
        <div class="card__front" style="background-image: url('./images/${image}')"></div>
        <div class="card__back"></div>
        <div class="card__overlay"></div>
      </div>
    `;
  }

  flipToBack(): Promise<void> {
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
