import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('news', (table) => {
    table.string('img_src');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('news', (table) => {
    table.dropColumn('img_src');
  });
}
