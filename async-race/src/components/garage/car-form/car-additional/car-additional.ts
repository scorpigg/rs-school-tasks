import { ICarsAdditional } from '../../../../entities/cars-additional';
import { generateCars, race } from '../../../../services/cars.services';
import { Render } from '../../../Render';

export class CarAdditional extends Render {
  private additionalBtns: ICarsAdditional[] = [
    {
      className: 'race',
      disabled: '',
      text: 'Race',
    },
    {
      className: 'reset',
      disabled: 'disabled',
      text: 'Reset',
    },
    {
      className: 'generate-cars',
      disabled: '',
      text: 'Generate cars',
    },
  ];

  private btn?: Render;

  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', ['form-container'], '');
    this.addBtns(this.additionalBtns);
    const careateCars = this.element.querySelector('.generate-cars') as HTMLElement;
    const startRace = this.element.querySelector('.race') as HTMLElement;
    const resetRace = this.element.querySelector('.reset') as HTMLElement;

    careateCars.addEventListener('click', generateCars);

    startRace.addEventListener('click', (e) => {
      race(e, true);
      resetRace.classList.remove('disabled');
    });

    resetRace.addEventListener('click', (e) => {
      race(e, false);
      startRace.classList.remove('disabled');
    });
  }

  addBtns(btns:ICarsAdditional[]): void {
    btns.forEach((btn) => {
      this.btn = new Render(this.element, 'button', [`${btn.className}`], `${btn.text}`);
      this.btn.element.setAttribute('type', 'button');
      if (btn.disabled) this.btn.element.classList.add(`${btn.disabled}`);
    });
  }
}
