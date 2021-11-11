import Knex from 'knex';
import configs from './knexfile';

const config = configs[process.env['NODE_ENV'] || 'development'];

const knex = config ? Knex(config) : null;

export default knex;
