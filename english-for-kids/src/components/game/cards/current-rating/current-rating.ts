import { Render } from '../../../Render';

export class CurrentRating extends Render {
  constructor(parentNode:HTMLElement) {
    super(parentNode, 'div', ['current-rating']);
  }
}
