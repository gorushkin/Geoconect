import { Model, ValidationError } from 'objection';

// TODO: переименовать табблицу в БД и миграциях

export default class Applications extends Model {
  static get tableName() {
    return 'requests';
  }

  $beforeInsert() {
    // if (this.id) {
    //   throw new ValidationError({
    //     message: 'identifier should not be defined before insert',
    //     type: 'MyCustomError',
    //     data: someObjectWithSomeData
    //   });
    // }
    const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;

    if (!emailRegex.test(this.email)) {
      throw new ValidationError({
        message: 'email is not correct',
        type: 'MyCustomError',
      });
    }
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
