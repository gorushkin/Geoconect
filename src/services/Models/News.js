import { Model } from 'objection';

class News extends Model {
  static get tableName() {
    return 'news';
  }
}

export { News };
