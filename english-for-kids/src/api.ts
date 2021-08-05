import { ICard } from '../server/src/cards/card.interface';
import { ICategory } from '../server/src/category/category.interface';

const baseUrl = 'http://localhost:3000/api';

const path = {
  categories: '/categories',
  cards: '/cards',
  users: '/users/login',
};

export const getCategories = async (): Promise<ICategory[]> => {
  const response = await fetch(`${baseUrl}${path.categories}`);
  const categories = await response.json();
  return categories;
};

export const getCards = async (): Promise<ICard> => {
  const response = await fetch(`${baseUrl}${path.cards}`);
  const cards = await response.json();
  return cards;
};

export const getCardsByCategoryId = async (categoryId: number): Promise<ICard[]> => {
  const response = await fetch(`${baseUrl}${path.cards}/${categoryId}`);
  const cards = await response.json();
  return cards;
};

export const loginUser = async (userName: string, userPassword: string): Promise<{ accessToken: string, refreshTokens: string }> => {
  const response = await fetch(`${baseUrl}${path.users}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ username: userName, password: userPassword }),
  });
  const token = await response.json();
  return token;
};
