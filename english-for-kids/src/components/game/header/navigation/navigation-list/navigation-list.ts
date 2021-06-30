import { categories } from '../../../../../../public/cards';
import { Render } from '../../../../Render';

export class NavigationList extends Render {
  private navigationLink?: Render;

  private mainMenuLink: Render;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'ul', ['navigation__list']);
    this.mainMenuLink = new Render(this.element, 'a', ['navigation__item'], 'Main menu');
    this.mainMenuLink.element.setAttribute('href', '#!');
    this.mainMenuLink.element.setAttribute('data-page', 'main');
    this.renderLinks();
  }

  renderLinks(): void {
    categories.forEach((category, index) => {
      this.navigationLink = new Render(this.element, 'a', ['navigation__item'], category);
      this.navigationLink.element.setAttribute('href', '#!');
      this.navigationLink.element.setAttribute('data-page', `${index}`);
    });
  }
}
