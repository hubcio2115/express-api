"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOneInputSchema = void 0;
const zod_1 = require("zod");
exports.createOneInputSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    stock: zod_1.z.number(),
});
