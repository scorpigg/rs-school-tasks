import './scss/styles.scss';
import { App } from './app';

window.addEventListener('load', () => {
  new App(document.body);
  // fetch('http://localhost:3000/api/posts/')
  // .then(result => {
  //   return result.json();
  // })
  // .then(data => {
  //   console.log(data);
  // })
});
