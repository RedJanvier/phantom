import 'dotenv/config.js';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import docs from './docs/index.json';

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use('/', serve, setup(docs));
app.get('/api', (req, res) => res.sendStatus(200));

app.listen(PORT, () =>
  console.log(`Server is started at http://localhost:${PORT}`)
);

export default app;
