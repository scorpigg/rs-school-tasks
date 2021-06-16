import { addCar, saveCarColorFieldState, saveCarNameFieldState } from '../../../../services/cars.services';
import { Render } from '../../../Render';

export class CarCreate extends Render {
  carName: Render;

  carColor: Render;

  carCreateBtn: Render;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['form-container'], '');
    this.carName = new Render(this.element, 'input', ['car-create__name'], '');
    this.carName.element.setAttribute('type', 'text');
    this.carName.element.setAttribute('placeholder', 'Enter car name');
    this.carColor = new Render(this.element, 'input', ['car-create__color'], '');
    this.carColor.element.setAttribute('type', 'color');
    this.carCreateBtn = new Render(this.element, 'button', ['car-create__btn'], 'Create');
    this.carCreateBtn.element.setAttribute('type', 'button');

    this.carCreateBtn.element.addEventListener('click', addCar);
    saveCarNameFieldState();
    saveCarColorFieldState();
  }
}
