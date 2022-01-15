import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('applications', (table) => {
    table.increments('id').primary();
    table.string('phone').notNullable();
    table.string('email');
    table.string('name').notNullable();
    table.text('body');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('applications');
};
