import Knex from 'knex';
import configs from './knexfile';
import { Model, ForeignKeyViolationError, ValidationError } from 'objection';

const config = configs[process.env.NODE_ENV || 'development'];

const knex = Knex(config);
Model.knex(knex);

export default knex;
