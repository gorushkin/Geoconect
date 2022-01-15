import { Model } from 'objection';
import crypto from 'crypto';

export const encrypt = (value: string) => crypto.createHash('sha256').update(value).digest('hex');

export default class User extends Model {
  static get tableName() {
    return 'users';
  }

  id: number;
  name: string;
  email: string;
  role: string;
  hashedPassword: string;

  static jsonSchema = {
    type: 'object',
    required: ['email', 'role', 'password'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      role: { type: 'string', enum: ['user', 'admin'], default: 'user' },
      password: { type: 'string', minLength: 3 },
    },
  };

  $beforeValidate(jsonSchema: any, json: any) {
    if (json.password !== json.passwordConfirm) throw Error('Passwords must match');
    return jsonSchema;
  }

  set password(value: string) {
    this.hashedPassword = encrypt(value);
  }

  set passwordConfirm(_value: string) {
    return;
  }

  verifyPassword(password: string) {
    return encrypt(password) === this.hashedPassword;
  }

  isAdmin() {
    return this.role == 'admin';
  }

  info() {
    return { id: this.id, email: this.email, name: this.name, role: this.role };
  }
}
