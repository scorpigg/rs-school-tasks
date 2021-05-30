import { Render } from '../../Render';

export class GameCards extends Render {
  private label: Render;

  private select: Render;

  private selectOption?: Render;

  private options: { value: string, name: string, selected: string, disabled: string }[] = [
    {
      value: '',
      name: 'Select game cards type',
      selected: 'selected',
      disabled: 'disabled',
    },
    {
      value: '0',
      name: 'Animals',
      selected: '',
      disabled: '',
    },
    {
      value: '1',
      name: 'Nature',
      selected: '',
      disabled: '',
    },
    {
      value: '2',
      name: 'Cars',
      selected: '',
      disabled: '',
    },
  ];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['game-cards', 'game-container'], '');
    this.label = new Render(this.element, 'label', [], 'Game cards');
    this.label.element.setAttribute('for', 'game-cards__type');

    this.select = new Render(this.element, 'select', [], '');
    this.select.element.setAttribute('id', 'game-cards__type');

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
