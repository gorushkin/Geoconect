import { Knex } from 'knex';
import path from 'path';
const dirname = path.resolve();

const migrations = {
  directory: path.join(dirname, 'src', 'database', 'migrations'),
};

const seeds = {
  directory: path.join(dirname, 'src', 'database', 'seeds'),
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
    seeds,
  },

  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      database: 'geo',
      user: 'postgres',
      password: 'postgres',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: migrations.directory,
    },
    seeds,
  },
};

export default configs;
