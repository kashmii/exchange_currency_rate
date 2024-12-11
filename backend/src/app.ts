import express from 'express';
import Routes from './routes/index';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3001;

app.use(express.json());

app.get('/', (req, res: any) => res.send('Hello World!'));

app.use('/api', Routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
