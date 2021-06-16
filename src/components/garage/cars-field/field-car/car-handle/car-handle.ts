import { Render } from '../../../../Render';

export class CarHandle extends Render {
  private selectBtn: Render;

  private removeBtn: Render;

  private carName: Render;

  constructor(parentNode: HTMLElement, carName:string) {
    super(parentNode, 'div', ['car-handle'], '');
    this.selectBtn = new Render(this.element, 'button', ['select-btn'], 'Select');
    this.removeBtn = new Render(this.element, 'button', ['remove-btn'], 'Remove');
    this.carName = new Render(this.element, 'span', ['car-name'], carName);
  }
}
