import { Render } from '../../../Render';

export class StartGameBtn extends Render {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'button', ['start-game-btn', 'hidden'], 'Start game');
  }
}
