import { Render } from '../../../Render';

export class MainCard extends Render {
  private mainImg: Render;

  constructor(parentNode:HTMLElement, category: string, cardImg: string) {
    super(parentNode, 'a', ['main-card']);
    this.element.setAttribute('href', '#!');
    this.mainImg = new Render(this.element, 'img', ['main-img']);
    this.mainImg.element.setAttribute('alt', category);
    this.mainImg.element.setAttribute('src', cardImg);
    new Render(this.element, 'span', ['main-card__text'], category);
  }
}
