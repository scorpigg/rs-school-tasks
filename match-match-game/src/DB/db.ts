/* eslint-disable @typescript-eslint/no-unused-vars */
import { Render } from '../components/Render';

export function addUserInDb(name = '', lastName = '', email = '', score = 0): void {
  const request = indexedDB.open('best-score', 1);
  let db: IDBDatabase;
  let tx: IDBTransaction;

  request.onupgradeneeded = () => {
    db = request.result;
    db.createObjectStore('users', { autoIncrement: true });
  };

  request.onsuccess = () => {
    db = request.result;
    tx = db.transaction('users', 'readwrite');
    tx.objectStore('users');
    const users = tx.objectStore('users');

    const user: { userName: string, userLastName: string, userEmail: string, userScore: number } = {
      userName: name,
      userLastName: lastName,
      userEmail: email,
      userScore: score,
    };
    users.put(user);
  };
}

export function getDbUsers(): void {
  const bestScore: HTMLElement | null = document.querySelector('.best-score');
  const request = indexedDB.open('best-score', 1);
  let db: IDBDatabase;
  let tx: IDBTransaction;

  request.onupgradeneeded = () => {
    db = request.result;
  };

  request.onsuccess = () => {
    db = request.result;
    tx = db.transaction('users', 'readwrite');
    const users = tx.objectStore('users');
    const getUsers = users.getAll();
    getUsers.onsuccess = () => {
      getUsers.result.forEach((user) => {
        const player = new Render(bestScore, 'div', ['player'], '');
        const playerInfo = new Render(player.element, 'p', ['player__info'], '');
        const playerScore = new Render(player.element, 'p', ['player__score'], `Score: ${user.userScore}`);
        const playerName = new Render(
          playerInfo.element,
          'p',
          ['player__name'],
          `${user.userName} ${user.userLastName}`,
        );
        const playerEmail = new Render(playerInfo.element, 'p', ['player__email'], `${user.userEmail}`);
      });
    };
  };
}
