import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('requests', (table) => {
    table.increments('id').primary();
    table.string('phone').notNullable();
    table.string('email').notNullable();
    table.string('name');
    table.text('body');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('requests');
}
