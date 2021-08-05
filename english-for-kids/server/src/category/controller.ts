import { ICategory } from './category.interface';

const categories: ICategory[] = [
  {
    id: 1,
    name: 'Action (set A)',
  },
  {
    id: 2,
    name: 'Action (set B)',
  },
  {
    id: 3,
    name: 'Animal (set A)',
  },
  {
    id: 4,
    name: 'Animal (set B)',
  },
  {
    id: 5,
    name: 'Clothes',
  },
  {
    id: 6,
    name: 'Emotions',
  },
  {
    id: 7,
    name: 'Vegetables',
  },
  {
    id: 8,
    name: 'Fruits',
  },
];

const newId = (function a() {
  let id = categories.length;
  return () => id++;
}());

export function getCategories(): Promise<ICategory[]> {
  return Promise.resolve(categories);
}

export function getCategoryById(id:number): Promise<ICategory | undefined> {
  const category = categories.find((cat) => cat.id === id);
  return Promise.resolve(category);
}

export function deletCategory(id:number): Promise<void> {
  const categoryIndex = categories.findIndex((cat) => cat.id === id);
  if (categoryIndex < 0) return Promise.reject(new Error('Category not found'));
  categories.splice(categoryIndex, 1);
  return Promise.resolve();
}

export function createCategory(data: ICategory): Promise<ICategory> {
  const isExists = categories.findIndex((cat) => cat.name === data.name) > 0;
  if (isExists) {
    return Promise.reject(new Error(`Category with name ${data.name} already exists`));
  }
  const newCategory: ICategory = {
    ...data,
    id: newId(),
  };
  categories.push(newCategory);
  return Promise.resolve(newCategory);
}
