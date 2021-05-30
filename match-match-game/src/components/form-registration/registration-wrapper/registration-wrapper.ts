import './registration-wrapper.scss';
import { Render } from '../../Render';
import { RegistrationContainer } from './registration-container/registration-container';
import { RegistrationUserImage } from './registration-user-img/registration-user-img';

export class RegistrationWrapper extends Render {
  private registrationContaner: RegistrationContainer;

  private registrationUserImage: RegistrationUserImage;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['registration-wrapper'], '');
    this.registrationContaner = new RegistrationContainer(this.element);
    this.registrationUserImage = new RegistrationUserImage(this.element);
  }
}
