import { z } from 'zod';

export const createOneInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
});
