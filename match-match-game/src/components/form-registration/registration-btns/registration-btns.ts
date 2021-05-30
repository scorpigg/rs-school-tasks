import './registration-btns.scss';
import { Render } from '../../Render';
import { closeForm } from '../../../services/registration-form.service';

export class RegistrationBtns extends Render {
  private submitBtn: Render;

  private cancelBtn: Render;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['registration__buttons'], '');
    this.submitBtn = new Render(this.element, 'button', ['submit-btn', 'disabled'], 'Add user');
    this.cancelBtn = new Render(this.element, 'button', ['cancel-btn'], 'Cancel');
    this.submitBtn.element.setAttribute('type', 'submit');
    this.cancelBtn.element.setAttribute('type', 'button');

    closeForm(this.cancelBtn.element, '.form-registration');
    closeForm(this.submitBtn.element, '.form-registration');

    this.submitBtn.element.addEventListener('click', (e) => {
      e.preventDefault();
    });
  }
}
