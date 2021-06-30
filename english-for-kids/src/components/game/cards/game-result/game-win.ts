import { Render } from '../../../Render';

export class GameWin extends Render {
  constructor(parentNode: HTMLElement, text: string) {
    super(parentNode, 'div', ['game-result', 'game-win'], text);
  }
}
