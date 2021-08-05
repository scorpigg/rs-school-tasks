import { Render } from '../../Render';

export class Header extends Render {
  private container: Render;

  private categories: Render;

  private words: Render;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['header__admin']);
    this.container = new Render(this.element, 'div', ['header-container']);
    this.categories = new Render(this.container.element, 'a', ['admin-link'], 'Categories');
    this.words = new Render(this.container.element, 'a', ['admin-link'], 'Words');
    new Render(this.element, 'a', ['admin-link', 'admin-logout'], 'Log out');
  }
}
