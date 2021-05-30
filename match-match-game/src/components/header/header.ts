import './header.scss';
import { Render } from '../Render';
import { HeaderLeft } from './header-left/header-left';
import { HeaderRight } from './header-right/header-right';

export class Header extends Render {
  private readonly headerLeft: HeaderLeft;

  private readonly headerRight: HeaderRight;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', ['header'], '');
    this.headerLeft = new HeaderLeft(this.element);
    this.headerRight = new HeaderRight(this.element);
  }
}
