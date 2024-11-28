import express from 'express';
import Routes from './routes/index';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res: any) => res.send('Hello World!'));

app.use('/api', Routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
