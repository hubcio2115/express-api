"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInputSchema = void 0;
const zod_1 = require("zod");
exports.getAllInputSchema = zod_1.z.object({
    sort: zod_1.z
        .object({
        title: zod_1.z.enum(['asc', 'desc']).optional(),
        price: zod_1.z.enum(['asc', 'desc']).optional(),
        stock: zod_1.z.enum(['asc', 'desc']).optional(),
    })
        .optional(),
    filter: zod_1.z
        .object({
        title: zod_1.z.string().optional(),
        price: zod_1.z.string().optional(),
        stock: zod_1.z.string().optional(),
    })
        .optional(),
});
