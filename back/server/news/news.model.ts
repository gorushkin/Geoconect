import { Model } from 'objection';

export default class News extends Model {
  static get tableName() {
    return 'news';
  }

  static jsonSchema = {
    type: 'object',
    required: ['body', 'title'],

    properties: {
      id: { type: 'integer' },
      title: { type: 'string', minLength: 1 },
      body: { type: 'string', minLength: 1 },
    },
  };
}
