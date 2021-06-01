import { Render } from '../../Render';

export class GameDificulity extends Render {
  private label: Render;

  private select: Render;

  private selectOption?: Render;

  private options: { value: string, name: string, selected: string, disabled: string }[] = [
    {
      value: '4',
      name: '4x4',
      selected: '',
      disabled: '',
    },
    {
      value: '6',
      name: '6x6',
      selected: '',
      disabled: '',
    },
    {
      value: '8',
      name: '8x8',
      selected: '',
      disabled: '',
    },
  ];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['game-dificulity', 'game-container'], '');
    this.label = new Render(this.element, 'label', [], 'Game dificulity');
    this.label.element.setAttribute('for', 'game-dificulity__type');

    this.select = new Render(this.element, 'select', [], '');
    this.select.element.setAttribute('id', 'game-dificulity__type');

    this.options.forEach((option) => {
      this.selectOption = new Render(this.select.element, 'option', [], `${option.name}`);
      this.selectOption.element.setAttribute('value', `${option.value}`);
      if (option.selected && option.disabled) {
        this.selectOption.element.setAttribute('selected', `${option.selected}`);
        this.selectOption.element.setAttribute('disabled', `${option.disabled}`);
      }
    });
  }
}
