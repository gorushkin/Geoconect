import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('news', (table) => {
    table.string('href');
    table.string('title');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('news', (table) => {
    table.dropColumn('href');
    table.dropColumn('title');
  });
}
