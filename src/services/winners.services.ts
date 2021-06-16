/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getWinners } from '../api';
import { Render } from '../components/Render';
import { TableRow } from '../components/winners/winners-table/table-row/table-row';
import { WinnersTable } from '../components/winners/winners-table/winners-table';
import { IWinner } from '../entities/cars-additional';
import store from './store.services';

export const renderWinners = async () => {
  const winnersContainer = document.querySelector('.winners-container') as HTMLElement;
  const { winners, count } = await getWinners(store.winnersPage);

  winnersContainer.innerHTML = '';
  new Render(winnersContainer, 'h2', ['winners__title'], `Winners(${count})`);
  new Render(winnersContainer, 'p', ['winners__page'], `Page #${store.winnersPage}`);
  const winnersTable: WinnersTable = new WinnersTable(winnersContainer);
  winners.forEach((winner: IWinner) => {
    new TableRow(winnersTable.element,
      {
        id: winner.id,
        color: winner.car.color,
        name: winner.car.name,
        wins: winner.wins,
        bestTime: winner.time,
      });
  });
};

export const nextWinnersPage = async () => {
  const { count } = await getWinners(store.winnersPage);
  const pages = Math.ceil(Number(count) / 7);
  if (store.winnersPage < pages) {
    store.winnersPage++;
    await renderWinners();
  }
};

export const prevWinnersPage = async () => {
  if (store.winnersPage > 1) {
    store.winnersPage--;
    await renderWinners();
  }
};
