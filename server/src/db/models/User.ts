import { Model } from "objection";
import { Survey } from "./Survey";
import path from "path";

export class User extends Model {
  static get tableName() {
    return "users";
  }

  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  confirmationToken?: string | null;
  isConfirmed!: boolean;

  surveys!: Survey[];

  createdAt!: string;
  updatedAt!: string;

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      surveys: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, "Survey"),
        join: {
          from: "users.id",
          to: "surveys.userId",
        },
      },
    };
  }
}
