import Knex, { Knex as K } from 'knex';
import { CONFIG } from '../helpers/config';
import configs from './knexfile';
import { up as runMigrations } from './migrations/20220512092147_init';
import { seed as addUser } from './seeds/02_users';

const config = configs[CONFIG.NODE_ENV || 'development'];

const knex = config ? Knex(config) : null;

let isBDEmpty = true;

const initDatabase = async () => {
  if (knex) {
    try {
      const users = (await knex.queryBuilder().select('*').from('users')).map((item) => item.name);
      console.log('users: ', users);
    } catch (error) {
      if (isBDEmpty) {
        await runMigrations(knex);
        await addUser(knex);
        isBDEmpty = false;
        initDatabase();
      } else {
        console.log(error);
      }
    }
  }
};

initDatabase();

export default knex;
