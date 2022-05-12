import { Knex } from 'knex';
import { CONFIG } from '../../helpers/config';
import { encrypt } from '../../resources/users/users.model';
import { User } from '../../resources/users/users.services';

const adminPass = CONFIG.ADMIN_PASSW;

if (!adminPass) {
  throw new Error('Add admin data to config');
}

const hashedPassword = encrypt(adminPass);
const user = {
  id: 1,
  name: 'Artyom',
  email: 'gorushkin@gmail.com',
  role: 'admin',
  hashedPassword,
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
