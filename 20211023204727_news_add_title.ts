import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  knex.schema.table('news', (table) => {
    table.string('title');
    table.
  });
};

export const down = async (knex: Knex): Promise<void> =>
  knex.schema.table('news', (table) => {
    table.dropColumn('title');
  });
