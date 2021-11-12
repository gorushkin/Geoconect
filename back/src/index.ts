#!/usr/bin/env nodejs
import * as dotenv from 'dotenv';
dotenv.config();
import app from './server';
import knex from './database/db';
const PORT = process.env['PORT'];
import { Model } from 'objection';
Model.knex(knex);

app.listen(PORT, () => {
  console.log(`app start at port ${PORT}`);
});

console.log('start');
