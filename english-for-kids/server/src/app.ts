// import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import categories from './category/router';
import cards from './cards/router';
import users from './users/router';
// const staticFilesPath = path.resolve(__dirname, './www');

const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use('/', express.static(staticFilesPath));
app.use('/api/categories', categories);
app.use('/api/cards', cards);
app.use('/api/users', users);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
