import { IWinner } from './entities/cars-additional';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const baseUrl = 'http://127.0.0.1:3000';

const path = {
  garage: '/garage',
  winners: '/winners',
  engine: '/engine',
};

export const startEngine = async (id:number) => {
  const response = await fetch(`${baseUrl}${path.engine}?id=${id}&status=started`);
  const start = await response.json();

  return start;
};

export const stopEngine = async (id:number) => {
  const response = await fetch(`${baseUrl}${path.engine}?id=${id}&status=stopped`);
  const stop = await response.json();

  return stop;
};

export const drive = async (id: number) => {
  const result = await fetch(`${baseUrl}${path.engine}?id=${id}&status=drive`).catch();
  return result.status;
};

export const getCars = async (page: number, limit = 7) => {
  const response = await fetch(`${baseUrl}${path.garage}?_page=${page}&_limit=${limit}`);
  const cars = await response.json();

  const count = response.headers.get('X-Total-Count');
  return { cars, count };
};

export const getCar = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`);
  const car = await response.json();

  return car;
};

export const createCar = async (body: { name:string, color:string }) => {
  const response = await fetch(`${baseUrl}${path.garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const car = await response.json();

  return car;
};

export const remakeCar = async (id: number, body: { name:string, color:string }) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const car = await response.json();
  return car;
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.garage}/${id}`, {
    method: 'DELETE',
  });
  const car = await response.json();

  return car;
};

export const getWinners = async (page: number, limit = 10) => {
  const response = await fetch(`${baseUrl}${path.winners}?_page=${page}&_limit=${limit}`);
  const items = await response.json();

  const winners: IWinner[] = await Promise.all(items
    .map(async (winner: IWinner) => ({ ...winner, car: await getCar(winner.id) })));

  const count = response.headers.get('X-Total-Count');
  return { winners, count };
};

export const createWinner = async (body: { name:string, color:string }) => {
  const response = await fetch(`${baseUrl}${path.winners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const winner = await response.json();

  return winner;
};

export const getWinner = async (id: number) => {
  const response = await fetch(`${baseUrl}${path.winners}/${id}`);
  const winner = await response.json();

  return winner;
};
