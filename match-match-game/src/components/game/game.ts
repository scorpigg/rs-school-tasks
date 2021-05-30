import { Card } from '../cards-field/card/card';
import { CardsField } from '../cards-field/cards-field';
import { delay } from '../../shared/delay';
import { Render } from '../Render';
import { Timer } from '../timer/timer';
import { cardCorrect } from '../../services/game.service';

const FLIP_DELAY = 1000;

export class Game extends Render {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  private timer: Timer;

  private counter: number;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['cards-field-wrapper'], '');
    this.timer = new Timer(this.element);
    this.cardsField = new CardsField(this.element);
    this.counter = 0;
  }

  newGame(images: string[]): void {
    this.counter = 0;
    this.cardsField.clear();
    this.timer.start(3000);
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => {
        this.cardHandler(card);
      });
    });

    this.cardsField.addCards(cards);
  }

  stop():void {
    this.timer.stop();
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    this.isAnimation = true;
    cardCorrect(card.element, true);
    await card.flipToFront();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      cardCorrect(card.element, false);
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      cardCorrect(card.element);
      this.counter++;
    }
    if (this.counter === 8) {
      const time: string = this.timer.element.innerText;
      this.timer.stop();
      // eslint-disable-next-line no-alert
      alert(`Congratulations! You successfully found all matches on ${time} minutes.`);
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
