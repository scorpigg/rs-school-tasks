import './overlay.scss';
import { Render } from '../Render';
import { hideModal } from '../../services/modal.service';
import { resetForm } from '../../services/registration-form.service';

export class Overlay extends Render {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['overlay', 'hidden'], '');
    this.element.addEventListener('click', () => {
      const regModal: HTMLElement | null = document.querySelector('.form-registration');
      if (regModal) {
        hideModal(regModal);
        resetForm('.registration');
      }
    });
  }
}
