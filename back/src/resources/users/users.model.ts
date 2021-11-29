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
    required: ['name', 'email', 'role', 'password'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 3 },
      email: { type: 'string', format: 'email' },
      role: { type: 'string', enum: ['user', 'admin'], default: 'user' },
      password: { type: 'string', minLength: 3 },
    },
  };

  set password(value: string) {
    this.hashedPassword = encrypt(value);
  }

  verifyPassword(password: string) {
    return encrypt(password) === this.hashedPassword;
  }

  info() {
    return { id: this.id, email: this.email, name: this.name, role: this.role };
  }
}
