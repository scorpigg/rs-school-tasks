/* eslint-disable consistent-return */
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from './user.interface';

const accessTokenSecret = 'secret';
const refreshTokenSecret = 'refreshsecret';

const router = Router();

const users: IUser[] = [{
  username: 'admin',
  password: 'admin',
  role: 'admin',
}];

let refreshTokens: string[] = [];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
    const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

    refreshTokens.push(refreshToken);
    res.json({
      accessToken,
      refreshToken,
    });
  } else {
    res.send('User or password incorrect');
  }
});

router.post('/token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, refreshTokenSecret, (err: jwt.VerifyErrors | null, user: jwt.JwtPayload | undefined) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign({ username: user?.username, role: user?.role }, accessTokenSecret, { expiresIn: '20m' });

    res.json({
      accessToken,
    });
  });
});

router.post('/logout', (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.send('Logout successful');
});

export default router;
