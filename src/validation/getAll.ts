import { z } from 'zod';

export const getAllInputSchema = z.object({
  sort: z
    .object({
      title: z.enum(['asc', 'desc']).optional(),
      price: z.enum(['asc', 'desc']).optional(),
      stock: z.enum(['asc', 'desc']).optional(),
    })
    .optional(),
  filter: z
    .object({
      title: z.string().optional(),
      price: z.string().optional(),
      stock: z.string().optional(),
    })
    .optional(),
});
