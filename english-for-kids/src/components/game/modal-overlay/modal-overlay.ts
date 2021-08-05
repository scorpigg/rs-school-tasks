import { Render } from '../../Render';

export class ModalOverlay extends Render {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['modal-overlay', 'hidden']);

    this.element.addEventListener('click', () => {
      const authjForm = document.querySelector('.auth-form') as HTMLElement;
      this.element.classList.add('hidden');
      authjForm.classList.add('hidden');
    });
  }
}
