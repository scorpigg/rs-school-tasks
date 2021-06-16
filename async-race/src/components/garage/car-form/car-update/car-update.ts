import { updateCar } from '../../../../services/cars.services';
import { Render } from '../../../Render';

export class CarUpdate extends Render {
  carName: Render;

  carColor: Render;

  carUpdateBtn: Render;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['form-container'], '');
    this.carName = new Render(this.element, 'input', ['car-update__name', 'disabled'], '');
    this.carName.element.setAttribute('type', 'text');
    this.carName.element.setAttribute('placeholder', 'Enter car name');
    this.carColor = new Render(this.element, 'input', ['car-update__color', 'disabled'], '');
    this.carColor.element.setAttribute('type', 'color');
    this.carUpdateBtn = new Render(this.element, 'button', ['car-update__btn', 'disabled'], 'Update');
    this.carUpdateBtn.element.setAttribute('type', 'button');

    this.carUpdateBtn.element.addEventListener('click', () => {
      const btn = this.carUpdateBtn.element;
      updateCar(Number(btn.dataset.id));
      this.carName.element.classList.add('disabled');
      this.carColor.element.classList.add('disabled');
      this.carUpdateBtn.element.classList.add('disabled');
    });
  }
}
