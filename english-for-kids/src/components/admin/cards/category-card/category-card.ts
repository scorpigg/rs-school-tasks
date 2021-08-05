import { Render } from '../../../Render';

export class CategoryCard extends Render {
  private categoryBtnsContainer: Render;

  constructor(parentNode: HTMLElement, categoryName: string, cardsCount: number) {
    super(parentNode, 'div', ['category__card']);
    new Render(this.element, 'h3', ['category__name'], `${categoryName}`);
    new Render(this.element, 'p', ['category__cards'], `Words: ${cardsCount}`);
    this.categoryBtnsContainer = new Render(this.element, 'div', ['category__btns-container']);
    new Render(this.categoryBtnsContainer.element, 'button', ['category__update', 'category__btn'], 'Update');
    new Render(this.categoryBtnsContainer.element, 'button', ['category__add-word', 'category__btn'], 'Add word');
    new Render(this.element, 'div', ['delete-category']);
  }
}
