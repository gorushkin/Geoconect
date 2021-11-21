import { Model } from 'objection';

export default class News extends Model {
  static get tableName() {
    return 'users';
  }

  id: number;
  name: string;
  email: string;
  role: string;
  password: string;

  static jsonSchema = {
    type: 'object',
    required: ['name', 'email', 'role', 'password'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1 },
      email: { type: 'string', minLength: 1 },
      role: { type: 'string', enum: ['user', 'admin'], default: 'user' },
      password: { type: 'string', minLength: 3 },
    },
  };
}
