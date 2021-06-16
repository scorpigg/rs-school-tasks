import { renderCars } from '../../../services/cars.services';
import { Render } from '../../Render';

export class CarsField extends Render {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['cars-field'], '');
    renderCars();
  }
}
