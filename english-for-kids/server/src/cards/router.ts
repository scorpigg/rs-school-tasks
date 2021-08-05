import { Router } from 'express';
import { getCards, getCardsByCategoryId } from './controller';

const router = Router();

router.get('/', async (req, res) => {
  const cards = await getCards();
  res.json(cards);
});

router.get('/:id', async (req, res) => {
  const catId = Number(req.params.id);
  if (!catId) {
    return res.sendStatus(400);
  }
  const cards = await getCardsByCategoryId(catId);
  if (!cards) {
    return res.sendStatus(404);
  }
  res.json(cards);
});

export default router;
