import { Knex } from 'knex';
import path from 'path';
const dirname = path.resolve();

import { CONFIG } from '../helpers/config';
const getPath = (...values: string[]) => path.join.apply(null, [dirname, ...values]);

const DB_PATH = CONFIG.DB_PATH || '../../data/db/';
const DB_NAME = CONFIG.DB_NAME || 'db.sqlite3';

const migrations = {
  directory: getPath('migrations'),
};

const seeds = {
  directory: getPath('seeds'),
};

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: getPath(DB_PATH, DB_NAME),
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
    seeds,
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: getPath(DB_PATH, DB_NAME),
    },
    migrations,
    seeds,
  },
  // producttion: {
  //   client: 'pg',
  //   connection: {
  //     host: 'postgres',
  //     port: 5432,
  //     database: 'geo',
  //     user: 'postgres',
  //     password: 'postgres',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //     directory: migrations.directory,
  //   },
  //   seeds,
  // },
};

export default configs;
