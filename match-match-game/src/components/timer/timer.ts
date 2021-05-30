import './timer.scss';
import { Render } from '../Render';

export class Timer extends Render {
  private time: number;

  private interval!: NodeJS.Timeout;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'p', ['timer'], '00:00');
    this.time = 0;
  }

  start(delay: number): void {
    this.time = 0;
    this.element.innerHTML = '00:00';
    setTimeout(() => {
      this.interval = setInterval(() => {
        this.tick();
      }, 1000);
    }, delay);
  }

  tick(): void {
    this.time++;
    this.render();
  }

  stop(): void {
    clearInterval(this.interval);
  }

  splitTime(): { m: number, s: number } {
    const hs: number = this.time % 3600;
    const m: number = Math.floor(hs / 60);
    const s: number = hs % 60;

    return { m, s };
  }

  render(): void {
    const timer = this.splitTime();
    this.element.innerHTML = `${`0${timer.m}`.slice(-2)}:${`0${timer.s}`.slice(-2)}`;
  }
}
