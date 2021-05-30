import './registration-container.scss';
import { Render } from '../../../Render';
import { IUser } from '../../../../entites/user';
import { showErrors } from '../../../../services/registration-form.service';

export class RegistrationContainer extends Render {
  private user: IUser[] = [
    {
      className: 'user-first-name',
      labelFor: 'user-first-name',
      contentText: 'First name',
      placeholder: 'Enter your first name',
      type: 'text',
    },
    {
      className: 'user-last-name',
      labelFor: 'user-last-name',
      contentText: 'Last name',
      placeholder: 'Enter your last name',
      type: 'text',
    },
    {
      className: 'user-email',
      labelFor: 'user-email',
      contentText: 'Email',
      placeholder: 'Enter your email',
      type: 'text',
    },
  ];

  private fieldContainer?: Render;

  private label?: Render;

  private input?: Render;

  private userName: HTMLElement | null;

  private userLastName: HTMLElement | null;

  private userEmail: HTMLElement | null;

  private errorsContainer?: Render;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['registration-container'], '');
    this.addUserForm(this.user);
    this.userName = this.element.querySelector('.user-first-name');
    this.userLastName = this.element.querySelector('.user-last-name');
    this.userEmail = this.element.querySelector('.user-email');
    showErrors(this.userName, 'Name');
    showErrors(this.userLastName, 'Lastname');
    showErrors(this.userEmail, 'Email');
  }

  private addUserForm(userInfo: IUser[]): void {
    userInfo.forEach((user) => {
      this.fieldContainer = new Render(this.element, 'div', [`${user.className}`, 'field-container'], '');
      this.label = new Render(this.fieldContainer.element, 'label', [], user.contentText);
      this.label.element.setAttribute('for', user.labelFor);
      this.input = new Render(this.fieldContainer.element, 'input', ['incorrect'], '');
      this.input.element.id = user.labelFor;
      this.input.element.setAttribute('type', user.type);
      this.input.element.setAttribute('placeholder', user.placeholder);
      this.errorsContainer = new Render(this.fieldContainer.element, 'p', ['errors', 'hidden'], '');
    });
  }
}
