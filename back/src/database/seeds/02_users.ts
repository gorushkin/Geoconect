import { Knex } from 'knex';

const user = {
  id: 1,
  name: 'Artyom',
  email: 'test@test.com',
  role: 'admin',
  hashedPassword: '4ee58b329cc7f4a9c26a2c7351a2cd2b6aab2dd95c39f1dce253721b083cbd43',
};

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries

  try {
    await knex('users').del();
    console.log('users is empty');
  } catch (error) {
    console.log(error);
  }

  // Inserts seed entries
  await knex('users').insert([user]);
}
