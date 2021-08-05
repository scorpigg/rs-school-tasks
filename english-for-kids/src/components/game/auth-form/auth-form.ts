import { Render } from '../../Render';

export class AuthForm extends Render {
  private authLogin: Render;

  private authPassword: Render;

  private authBtns: Render;

  private loginBtn: Render;

  private cancelBtn: Render;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'form', ['auth-form', 'hidden']);
    new Render(this.element, 'h2', ['auth__header'], 'Authorization');
    this.authLogin = new Render(this.element, 'input', ['auth__login']);
    this.authLogin.element.setAttribute('type', 'text');
    this.authLogin.element.setAttribute('placeholder', 'Enter username');

    this.authPassword = new Render(this.element, 'input', ['auth__password']);
    this.authPassword.element.setAttribute('type', 'password');
    this.authPassword.element.setAttribute('placeholder', 'Enter password');
    this.authBtns = new Render(this.element, 'div', ['auth__btns']);
    this.cancelBtn = new Render(this.authBtns.element, 'button', ['auth__cancel-btn'], 'Cancel');
    this.loginBtn = new Render(this.authBtns.element, 'button', ['auth__login-btn'], 'Login');
    // this.loginBtn.element.setAttribute('type', 'submit');

    this.cancelBtn.element.addEventListener('click', (e) => {
      e.preventDefault();
      this.element.classList.add('hidden');
      const overlay = document.querySelector('.modal-overlay') as HTMLElement;
      overlay.classList.add('hidden');
    });
  }
}
