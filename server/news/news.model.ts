import { Model } from 'objection';

export default class News extends Model {
  static get tableName() {
    return 'news';
  }

  static jsonSchema = {
    type: 'object',
    required: ['body'],

    properties: {
      id: { type: 'integer' },
      body: { type: 'string', minLength: 1 },
    },
  };
}
