import { Render } from '../../Render';
import { CarAdditional } from './car-additional/car-additional';
import { CarCreate } from './car-create/car-create';
import { CarUpdate } from './car-update/car-update';

export class CarForm extends Render {
  carCreate: CarCreate;

  carUpdate: CarUpdate;

  carAdditional: CarAdditional;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'form', ['car-form'], '');
    this.carCreate = new CarCreate(this.element);
    this.carUpdate = new CarUpdate(this.element);
    this.carAdditional = new CarAdditional(this.element);
  }
}
