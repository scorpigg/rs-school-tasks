import { getCardsByCategoryId, getCategories } from '../api';
import { CategoryCard } from '../components/admin/cards/category-card/category-card';
import { NewCategoryCard } from '../components/admin/cards/category-card/new-category-card';

export const renderAdminsCategoriesCards = async (): Promise<void> => {
  const categories = await getCategories();
  const categoriesCards = document.querySelector('.categories-cards') as HTMLElement;
  categories.forEach(async (category) => {
    const cards = await getCardsByCategoryId(category.id);
    new CategoryCard(categoriesCards, category.name, cards.length);
  });
  new NewCategoryCard(categoriesCards);
};
