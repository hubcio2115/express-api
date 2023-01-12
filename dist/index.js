"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const products_1 = __importDefault(require("./routers/products"));
dotenv_1.default.config();
(0, mongoose_1.connect)(process.env.DB_ADDRESS ?? 'mongodb://localhost:27017', {
    dbName: process.env.DB_NAME ?? 'test',
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/products', products_1.default);
app.get('/', (_, res) => res.send('Hello on my api! :D'));
app.listen(process.env.PORT ?? '3000', () => {
    console.log('Example app listening on port 3000');
});
exports.default = app;
