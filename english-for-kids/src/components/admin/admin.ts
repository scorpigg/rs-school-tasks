import { renderAdminsCategoriesCards } from '../../services/admin.services';
import { Render } from '../Render';
import { CategoriesCards } from './cards/categories-cards';
import { Header } from './header/header';

export class Admin extends Render {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['admin']);
    new Header(this.element);
    new CategoriesCards(this.element);
    renderAdminsCategoriesCards();
  }
}
