import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
const app = express();
require('dotenv').config();
const port = process.env.PORT;
require('./src/config/mongoose');

import userRouter from './src/routes/user';
import categoryRouter from './src/routes/category';

app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/category', categoryRouter)

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

export default app;
