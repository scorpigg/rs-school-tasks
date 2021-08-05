/* eslint-disable consistent-return */
import {
  Router, Request, Response, NextFunction,
} from 'express';
import jwt from 'jsonwebtoken';
import {
  createCategory, deletCategory, getCategories, getCategoryById,
} from './controller';
import { ICategory } from './category.interface';

const router = Router();
const accessTokenSecret = 'secret';

const authenticateJWT = (req: Request, res: Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.get('/', async (req, res) => {
  const categories = await getCategories();
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  const catId = Number(req.params.id);
  if (!catId) {
    return res.sendStatus(400);
  }
  const cat = await getCategoryById(catId);
  if (!cat) {
    return res.sendStatus(404);
  }
  res.json(cat);
});

router.delete('/:id', async (req, res) => {
  const catId = Number(req.params.id);
  if (!catId) {
    return res.sendStatus(400);
  }
  try {
    await deletCategory(catId);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(404).send(e);
  }
});

router.post('/', async (req, res) => {
  const data = req.body as ICategory;
  if (!data.name) return res.sendStatus(400);
  try {
    const newCategory = await createCategory(data);
    return res.json(newCategory);
  } catch (e) {
    return res.status(404).send(e);
  }
});

export default router;
