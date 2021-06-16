import { Switcher } from './components/switcher/switcher';

export class App {
  private switcher: Switcher;

  constructor(readonly parentNode: HTMLElement) {
    this.switcher = new Switcher(parentNode);
  }
}
