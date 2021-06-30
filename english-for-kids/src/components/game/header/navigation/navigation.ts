import { Render } from '../../../Render';
import { Hamburger } from './hamburger/hamburger';
import { NavigationList } from './navigation-list/navigation-list';

export class Navigation extends Render {
  private hamburger: Hamburger;

  private navigationList: NavigationList;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'nav', ['navigation']);
    this.hamburger = new Hamburger(this.element);
    this.navigationList = new NavigationList(this.element);
  }
}
