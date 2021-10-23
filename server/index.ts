import * as dotenv from 'dotenv';
dotenv.config();
import app from './server';
import knex from './database/db';
console.log('knex: ', knex);
const PORT = process.env.PORT;

const show = async () => {
  const list = await knex().select('*').from('news');
  console.log('list: ', list);
};

show();

app.listen(PORT, () => {
  console.log(`app start at port ${PORT}`);
});

console.log('start');
