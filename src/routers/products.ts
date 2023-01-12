import { Router } from 'express';
import { model, isValidObjectId } from 'mongoose';
import { getAllInputSchema } from '../validation/getAll';
import { createOneInputSchema } from '../validation/createOne';
import { productSchema, zodProductSchema } from '../schemas/product';

const productsRouter = Router();
const products = model('Products', productSchema);

productsRouter.get('/', async (req, res) => {
  try {
    const { sort, filter } = getAllInputSchema.parse(req.body);

    const sortQuery = sort ?? {};
    const filterQuery = filter ?? {};

    const data = await products.find({}).sort({});

    return res.send(data);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }
});

productsRouter.post('/', async (req, res) => {
  try {
    const input = createOneInputSchema.parse(req.body);

    const isUnique = !(await products.exists({ title: input.title }));

    if (isUnique) {
      const newProduct = (await products.create(input)).toJSON();

      return res.send(newProduct);
    } else
      return res.status(400).send('Product with provided title already exists');
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }
});

productsRouter.put('/:id', async (req, res) => {
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

        return res.send(updateResult);
      } else
        return res
          .status(404)
          .send('There is no document in the db with provided id');
    } else return res.status(400).send('Provided id is not a valid ObjectId');
  } catch (e) {
    console.error(e);
    return res.status(404).send(e);
  }
});

productsRouter.delete('/:id', async (req, res) => {
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

        return res.send(deletedData);
      } else
        return res
          .status(404)
          .send('There is no document in the db with provided id');
    } else res.status(400).send('Provided id is not a valid ObjectId');
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }
});

productsRouter.get('/raport', async (req, res) => {
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

    return res.send(raport);
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }
});

export default productsRouter;
