import mongoose from 'mongoose';
import { z } from 'zod';

export const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
});

export const zodProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
});
