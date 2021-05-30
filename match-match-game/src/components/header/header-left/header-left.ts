import './header-left.scss';
import { Render } from '../../Render';
import { HeaderLogo } from './header-logo/header-logo';
import { HeaderNavigation } from './header-navigation/header-navigation';

export class HeaderLeft extends Render {
  private readonly headerLogo: HeaderLogo;

  private readonly headerNavigation: HeaderNavigation;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['header__left'], '');
    this.headerLogo = new HeaderLogo(this.element);
    this.headerNavigation = new HeaderNavigation(this.element);
  }
}
