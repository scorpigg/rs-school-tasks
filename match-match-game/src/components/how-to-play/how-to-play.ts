import { Render } from '../Render';
import { HowToPlayList } from './list/how-to-play-list';
import { HowToPlayTitle } from './title/how-to-play-title';

export class HowToPlay extends Render {
  private readonly howToPlayTitle: HowToPlayTitle;

  private readonly howToPlayList: HowToPlayList;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'section', ['how-to-play', 'content-container'], '');
    this.howToPlayTitle = new HowToPlayTitle(this.element);
    this.howToPlayList = new HowToPlayList(this.element);
  }
}
