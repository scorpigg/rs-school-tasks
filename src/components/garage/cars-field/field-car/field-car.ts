import { Render } from '../../../Render';
import { CarDrive } from './car-drive/car-drive';
import { CarHandle } from './car-handle/car-handle';

export class FieldCar extends Render {
  private carHandle?: CarHandle;

  private carDrive?: CarDrive;

  constructor(parentNode: HTMLElement, carName: string, carColor: string) {
    super(parentNode, 'div', ['field__car'], '');
    this.carHandle = new CarHandle(this.element, carName);
    this.carDrive = new CarDrive(this.element, carColor);
  }
}
