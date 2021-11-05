import { Model } from 'objection';

export default class News extends Model {
  static get tableName() {
    return 'news';
  }

  static jsonSchema = {
    type: 'object',
    required: ['body', 'title', 'img_src'],

    properties: {
      id: { type: 'integer' },
      title: { type: 'string', minLength: 1 },
      body: { type: 'string', minLength: 1 },
      img_src: { type: 'string', minLength: 1 },
    },
  };
}
