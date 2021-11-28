import * as dotenv from 'dotenv';
dotenv.config();

const { PORT, NODE_ENV, SECRET = 'default' } = process.env;

export const CONFIG = { PORT, NODE_ENV, SECRET };
