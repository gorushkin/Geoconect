#!/usr/bin/env nodejs
import app from './server';
import knex from './database/db';
import { Model } from 'objection';
Model.knex(knex);

import { CONFIG } from './helpers/config';
console.log('CONFIG: ', CONFIG);

app.listen(CONFIG.PORT, () => {
  console.log(`app start at port ${CONFIG.PORT}`);
});
