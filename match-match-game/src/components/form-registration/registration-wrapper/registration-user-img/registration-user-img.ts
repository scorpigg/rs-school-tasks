import './registration-user-img.scss';
import { Render } from '../../../Render';

export class RegistrationUserImage extends Render {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['user-pic'], '');
  }
}
