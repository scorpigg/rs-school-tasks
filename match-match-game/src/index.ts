import './styles.scss';
import { App } from './app';

const application = new App(document.body);
const headerBtns = document.querySelectorAll('.header__btn');

headerBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('start-btn')) {
      application.start();
    }
    if (btn.classList.contains('stop-btn')) {
      application.stop();
    }
  });
}, { once: true });
