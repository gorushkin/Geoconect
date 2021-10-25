import { Knex } from 'knex';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.resolve();
console.log('__dirname: ', __dirname);

const migrations = {
  directory: path.join(__dirname, 'server', 'database', 'migrations'),
};

const seeds = {
  directory: path.join(__dirname, 'server', 'database', 'seeds'),
};

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    migrations,
    seeds,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default configs;
