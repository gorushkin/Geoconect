import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('news', (table) => {
    table.increments('id').primary();
    table.text('body').notNullable();
    table.string('href');
    table.string('title');
    table.string('img_src');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('role').notNullable();
    table.string('hashedPassword');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('proposals', (table) => {
    table.increments('id').primary();
    table.string('phone').notNullable();
    table.string('email');
    table.string('name').notNullable();
    table.text('body');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('news');
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('proposals');
}
