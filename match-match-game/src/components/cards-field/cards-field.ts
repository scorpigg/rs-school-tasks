import './cards-field.scss';
import { Card } from './card/card';
import { Render } from '../Render';

const SHOW_TIME = 3000;

export class CardsField extends Render {
  private cards: Card[] = [];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['cards-field'], '');
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME);
  }
}
