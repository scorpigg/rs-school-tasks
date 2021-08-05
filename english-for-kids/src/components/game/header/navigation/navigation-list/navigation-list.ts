import { getCategories } from '../../../../../api';
import { Render } from '../../../../Render';

export class NavigationList extends Render {
  private navigationLink?: Render;

  private mainMenuLink: Render;

  private loginBtn?: Render;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'ul', ['navigation__list']);
    this.mainMenuLink = new Render(this.element, 'a', ['navigation__item'], 'Main menu');
    this.mainMenuLink.element.setAttribute('href', '#!');
    this.mainMenuLink.element.setAttribute('data-page', 'main');
    this.renderLinks();
  }

  async renderLinks(): Promise<void> {
    const categories = await getCategories();
    categories.forEach((category: { id: number, name: string }, index) => {
      this.navigationLink = new Render(this.element, 'a', ['navigation__item'], category.name);
      this.navigationLink.element.setAttribute('href', '#!');
      this.navigationLink.element.setAttribute('data-page', `${index}`);
    });
    this.loginBtn = new Render(this.element, 'button', ['login-btn'], 'Login');

    this.loginBtn.element.addEventListener('click', () => {
      const authForm = document.querySelector('.auth-form') as HTMLElement;
      const overlay = document.querySelector('.modal-overlay') as HTMLElement;
      authForm.classList.remove('hidden');
      overlay.classList.remove('hidden');
    });
  }
}
