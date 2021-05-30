import './header-logo.scss';
import { Render } from '../../../Render';

export class HeaderLogo extends Render {
  private readonly logoLight: Render;

  private readonly logoDark: Render;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'a', ['header__logo', 'logo'], '');
    this.logoLight = new Render(null, 'span', ['logo__light'], 'Match');
    this.logoDark = new Render(null, 'span', ['logo__dark'], 'Match');
    this.element.appendChild(this.logoLight.element);
    this.element.appendChild(this.logoDark.element);
  }
}
