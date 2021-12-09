import { Model } from 'objection';

export default class Requests extends Model {
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
      body: { type: 'string', minLength: 1 },
    },
  };
}
