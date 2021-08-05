import { Render } from '../../../Render';

export class Card extends Render {
  private card: Render;

  private cardFront: Render;

  private cardBack: Render;

  private cardRotate: Render;

  constructor(parentNode:HTMLElement, image: string, frontText: string, backText: string) {
    super(parentNode, 'div', ['card-container']);
    new Render(this.element, 'div', ['overlay']);
    this.card = new Render(this.element, 'div', ['card']);
    this.cardFront = new Render(this.card.element, 'div', ['card__front']);
    this.cardFront.element.style.backgroundImage = `url(${image})`;
    new Render(this.cardFront.element, 'span', ['card__text'], frontText);

    this.cardBack = new Render(this.card.element, 'div', ['card__back']);
    this.cardBack.element.style.backgroundImage = `url(${image})`;
    new Render(this.cardBack.element, 'span', ['card__text'], backText);

    this.cardRotate = new Render(this.card.element, 'img', ['card__rotate-img']);
    this.cardRotate.element.setAttribute('src', './img/rotate.svg');
  }
}
