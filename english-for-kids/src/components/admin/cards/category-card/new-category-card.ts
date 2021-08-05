import { Render } from '../../../Render';

export class NewCategoryCard extends Render {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['category__card', 'category__creat']);
    new Render(this.element, 'h3', ['creat-category-title'], 'Creat new category');
    new Render(this.element, 'div', ['creat-card-btn']);
  }
}
