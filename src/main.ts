import express from 'express';
import cors from 'cors';
import { model, connect, isValidObjectId } from 'mongoose';
import dotenv from 'dotenv';
import { productSchema, zodProductSchema } from './schemas/product.js';
import { getAllInputSchema } from './validation/getAll.js';
import { createOneInputSchema } from './validation/createOne.js';
dotenv.config();

connect(process.env.DB_ADDRESS ?? 'localhost:27017', {
  dbName: process.env.DB_NAME ?? 'test',
});
const products = model('Products', productSchema);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/products', async (req, res) => {
  try {
    const { sort, filter } = getAllInputSchema.parse(req.body);

    const sortQuery = sort ?? {};
    const filterQuery = filter ?? {};

    const data = await products.find({}).sort({});

    res.send(data);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

app.post('/products', async (req, res) => {
  try {
    const input = createOneInputSchema.parse(req.body);

    const isUnique = !(await products.exists({ title: input.title }));

    if (isUnique) {
      const newProduct = (await products.create(input)).toJSON();

      res.send(newProduct);
    } else throw new Error('Product with provided title already exists');
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const newData = zodProductSchema.parse(req.body);

    if (isValidObjectId(id)) {
      const data = await products.findById(id);

      if (!!data) {
        const updateResult = (
          await products.findOneAndUpdate({ title: data.title }, newData, {
            new: true,
          })
        )?.toJSON();

        res.send(updateResult);
      } else
        res.status(404).send('There is no document in the db with provided id');
    } else res.status(400).send('Provided id is not a valid ObjectId');
  } catch (e) {
    console.error(e);
    res.status(404).send(e);
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isValidObjectId(id)) {
      const data = await products.findById(id);

      if (!!data) {
        const deletedData = (
          await products.findOneAndDelete({
            _id: id,
          })
        )?.toJSON();

        res.send(deletedData);
      } else
        res.status(404).send('There is no document in the db with provided id');
    } else res.status(400).send('Provided id is not a valid ObjectId');
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

app.get('/products/raport', async (req, res) => {
  try {
    const raport = await products.aggregate([
      {
        $project: {
          title: 1,
          stock: 1,
          totalValue: { $multiply: ['$stock', '$price'] },
        },
      },
    ]);

    res.send(raport);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

app.listen('3000', () => {
  console.log('Example app listening on port 3000');
});
