import { Model, ValidationError } from 'objection';

export default class Proposal extends Model {
  static get tableName() {
    return 'proposals';
  }

  id: number;
  email: string;
  phone: string;
  name: string;
  body: string;

  static jsonSchema = {
    type: 'name',
    required: ['email', 'phone'],

    properties: {
      id: { type: 'integer' },
      email: { type: 'string', minLength: 1 },
      phone: { type: 'string', minLength: 1 },
      body: { type: 'string' },
    },
  };
}
