import 'dotenv/config.js';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import { serve, setup } from 'swagger-ui-express';
import docs from './docs/index.json';
import routes from './routes';

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use('/api', routes);
app.use('/api/docs', serve, setup(docs));

app.listen(PORT, () =>
  console.log(`Server is started at http://localhost:${PORT}`)
);

export default app;
