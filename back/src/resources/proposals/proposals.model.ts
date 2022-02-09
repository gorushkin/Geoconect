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
    required: ['phone', 'name'],

    properties: {
      id: { type: 'integer' },
      email: { type: 'string'},
      phone: { type: 'string', minLength: 1 },
      body: { type: 'string' },
      name: { type: 'string' },
    },
  };
}
