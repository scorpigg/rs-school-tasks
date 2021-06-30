import { Render } from '../../../Render';

export class GameLose extends Render {
  constructor(parentNode: HTMLElement, text: string) {
    super(parentNode, 'div', ['game-result', 'game-lose'], text);
  }
}
