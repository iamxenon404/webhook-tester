import express, { Application } from 'express';
import cors from 'cors';
import { jsonParser, urlencodedParser, textParser, bodyFallback } from './middleware/bodyParser';
import createRouter from './routes/create';
import hookRouter from './routes/hook';
import logsRouter from './routes/logs';

const app: Application = express();

// CORS
app.use(cors());

// Body parsers
app.use(jsonParser);
app.use(urlencodedParser);
app.use(textParser);
app.use(bodyFallback);

// Routes
app.use('/create', createRouter);
app.use('/hook', hookRouter);
app.use('/', logsRouter);

export default app;