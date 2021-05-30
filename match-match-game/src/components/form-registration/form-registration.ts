import './form-registration.scss';
import { Render } from '../Render';
import { RegistrationWrapper } from './registration-wrapper/registration-wrapper';
import { RegistrationBtns } from './registration-btns/registration-btns';

export class FormRegistration extends Render {
  formRegistration: Render;

  registrationTitle: Render;

  registrationWrapper: RegistrationWrapper;

  registrationBtns: RegistrationBtns;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['form-registration', 'hidden'], '');
    this.formRegistration = new Render(this.element, 'form', ['registration'], '');
    this.registrationTitle = new Render(
      this.formRegistration.element,
      'h2',
      ['registration-title'],
      'Registr new Player',
    );
    this.registrationWrapper = new RegistrationWrapper(this.formRegistration.element);
    this.element.dataset.id = '1';
    this.registrationBtns = new RegistrationBtns(this.formRegistration.element);
  }
}
