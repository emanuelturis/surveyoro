import { Model } from "objection";

export class User extends Model {
  static get tableName() {
    return "users";
  }

  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;

  createdAt!: string;
  updatedAt!: string;

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
