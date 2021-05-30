import './game-settings.scss';
import { Render } from '../Render';
import { GameCards } from './game-cards/game-cards';
import { GameDificulity } from './game-difficulity/game-difficulity';

export class GameSettings extends Render {
  private gameCards: GameCards;

  private gameDificulity: GameDificulity;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', ['game-settings', 'content-container'], '');
    this.gameCards = new GameCards(this.element);
    this.gameDificulity = new GameDificulity(this.element);
  }
}
