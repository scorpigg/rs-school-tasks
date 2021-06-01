import { BestScore } from './components/best-score/best-score';
import { FormRegistration } from './components/form-registration/form-registration';
import { GameSettings } from './components/game-settings/game-settings';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { HowToPlay } from './components/how-to-play/how-to-play';
import { Overlay } from './components/overlay/overlay';
import { getDbUsers } from './DB/db';
import { ImageCategoryModel } from './models/get-category-model';
import { changeDisplay } from './services/modal.service';

export class App {
  private readonly header: Header;

  private readonly howToPlay: HowToPlay;

  private readonly overlay: Overlay;

  private readonly formRegistration: FormRegistration;

  private readonly bestScore: BestScore;

  private readonly gameSettings: GameSettings;

  private readonly game: Game;

  private gameType: HTMLSelectElement;

  private value!: number;

  constructor(private readonly parentNode: HTMLElement) {
    this.header = new Header(parentNode);
    this.howToPlay = new HowToPlay(parentNode);
    this.bestScore = new BestScore(parentNode);
    this.gameSettings = new GameSettings(parentNode);
    this.overlay = new Overlay(parentNode);
    this.formRegistration = new FormRegistration(parentNode);
    this.game = new Game(parentNode);
    this.gameType = document.getElementById('game-cards__type') as HTMLSelectElement;
    getDbUsers();
    this.gameType.addEventListener('change', () => {
      this.value = +this.gameType.value;
    });
    const routes: { path: string, component: HTMLElement }[] = [
      { path: '/', component: this.howToPlay.element },
      { path: '/best-score', component: this.bestScore.element },
      { path: '/game-settings', component: this.gameSettings.element },
      { path: '/game', component: this.game.element },
    ];

    const parseLocation = () => window.location.hash.slice(1).toLowerCase() || '/';

    const findComponentByPath = (path: string, routess: { path: string, component: HTMLElement }[]) => routess
      .find((rout: { path: string; }) => rout.path
        .match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

    const router = () => {
      const path = parseLocation();
      const { component = this.howToPlay.element } = findComponentByPath(path, routes) || {};
      document.body.innerHTML = '';
      document.body.appendChild(this.header.element);
      document.body.appendChild(this.overlay.element);
      document.body.appendChild(this.formRegistration.element);
      document.body.appendChild(component);
    };

    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
  }

  async start(): Promise<void> {
    const res = await fetch('./images.json');
    const categorites: ImageCategoryModel[] = await res.json();
    const cat = categorites[this.value] || categorites[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
    changeDisplay('.stop-btn', '.start-btn');
  }

  stop(): void {
    this.game.stop();
    changeDisplay('.start-btn', '.stop-btn');
  }
}
