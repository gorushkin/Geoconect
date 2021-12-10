import { Model } from 'objection';

// TODO: переименовать табблицу в БД и миграциях

export default class Applications extends Model {
  static get tableName() {
    return 'requests';
  }

  id: number;
  email: string;
  phone: string;
  name: string;
  body: string;

  static jsonSchema = {
    type: 'object',
    required: ['email', 'phone'],

    properties: {
      id: { type: 'integer' },
      email: { type: 'string', minLength: 1 },
      phone: { type: 'string', minLength: 1 },
      body: { type: 'string' },
    },
  };
}
