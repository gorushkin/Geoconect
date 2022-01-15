import Knex from 'knex';
import { CONFIG } from '../helpers/config';
import configs from './knexfile';

const config = configs[CONFIG.NODE_ENV || 'development'];

const knex = config ? Knex(config) : null;

const initDatabase = async () => {
  if (knex) {
    //   await knex.schema.createTableIfNotExists('news', (table) => {
    //     table.increments('id').primary();
    //     table.text('body').notNullable();
    //     table.string('href');
    //     table.string('title');
    //     table.string('img_src');
    //     if (knex) table.timestamp('updated_at').defaultTo(knex.fn.now());
    //     if (knex) table.timestamp('created_at').defaultTo(knex.fn.now());
    //   });
    try {
      // const list = await knex.queryBuilder().select('*').from('news');
      const users = (await knex.queryBuilder().select('*').from('users')).map((item) => item.name);
      console.log('users: ', users);
    } catch (error) {
      console.log(error);
    }
  }
};

initDatabase();

export default knex;
