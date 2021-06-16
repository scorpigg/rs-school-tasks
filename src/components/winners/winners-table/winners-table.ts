import { Render } from '../../Render';

export class WinnersTable extends Render {
  private tableHeaders: string[] = ['Number', 'Car', 'Name', 'Wins', 'Best time(seconds)'];

  private tableHeader?: Render;

  private tableHead: Render;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'table', ['winners__table'], '');
    this.tableHead = new Render(this.element, 'thead', ['table__head'], '');
    this.addTableHead();
  }

  addTableHead(): void {
    this.tableHeaders.forEach((el) => {
      this.tableHeader = new Render(this.tableHead.element, 'th', ['table__head'], el);
    });
  }
}
