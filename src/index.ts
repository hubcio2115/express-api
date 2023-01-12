import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import productsRouter from './routers/products';

dotenv.config();

connect(process.env.DB_ADDRESS ?? 'mongodb://localhost:27017', {
  dbName: process.env.DB_NAME ?? 'test',
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productsRouter);

app.listen(process.env.PORT ?? '3000', () => {
  console.log('Example app listening on port 3000');
});

export default app;
