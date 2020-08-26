import { Model } from "objection";

export class Person extends Model {
  static get tableName() {
    return "persons";
  }

  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;

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
