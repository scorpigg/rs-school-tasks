import { Render } from '../../Render';
import './how-to-play-list.scss';

export class HowToPlayList extends Render {
  private listItem?: Render;

  private listContainer?: Render;

  private listDescriprion?: Render;

  private listNumber?: Render;

  private listText?: Render;

  private listRegistrationImg?: Render;

  private listGameImg?: Render;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'ul', ['how-to-play__list'], '');
    this.addListElements([
      'Register new player in game',
      'Configure your game settings',
      'Start you new game! Remember card positions and match it before times up',
    ]);
  }

  addListElements(list: string[]): void {
    list.forEach((itemText, index) => {
      this.listItem = new Render(this.element, 'li', ['how-to-play__item'], '');
      this.listContainer = new Render(this.listItem.element, 'div', ['how-to-play__container'], '');
      this.listDescriprion = new Render(this.listContainer.element, 'p', ['how-to-play__desc'], '');
      this.listNumber = new Render(
        this.listDescriprion.element,
        'span',
        ['how-to-play__num'],
        `${index + 1}`,
      );
      this.listText = new Render(this.listDescriprion.element, 'span', [], itemText);
      if (index === 0) {
        this.listRegistrationImg = new Render(
          this.listItem.element,
          'div',
          ['regisration-img'],
          '',
        );
      } else if (index === 2) {
        this.listGameImg = new Render(this.listItem.element, 'div', ['game-img'], '');
      }
    });
  }
}
