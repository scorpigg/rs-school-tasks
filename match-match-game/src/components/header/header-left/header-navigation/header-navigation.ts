import './header-navigation.scss';
import { Render } from '../../../Render';

export class HeaderNavigation extends Render {
  private navigation: Render;

  private listItem?: Render;

  private navigationLink?: Render;

  private links: string[] = ['#/', '#/best-score', '#/game-settings'];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['header__navigation'], '');
    this.navigation = new Render(this.element, 'ul', ['navigation'], '');
    this.addNavList(['About Game', 'Best Score', 'Game Settings']);

    const navigationLinks = this.element.querySelectorAll('.navigation__link');

    navigationLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navigationLinks.forEach((linkk) => linkk.classList.remove('navigation__link_active'));
        link.classList.add('navigation__link_active');
      });
    });
  }

  addNavList(navList: string[]): void {
    navList.forEach((navName, index) => {
      this.listItem = new Render(this.navigation.element, 'li', [], '');
      this.navigationLink = new Render(this.listItem.element, 'a', ['navigation__link'], navName);
      this.navigationLink.element.setAttribute('href', `${this.links[index]}`);
    });
  }
}
