import { Model } from "objection";
import { Survey } from "./Survey";
import path from "path";

export class Person extends Model {
  static get tableName() {
    return "persons";
  }

  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  surveyId!: string;

  survey!: Survey;

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
      survey: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "Survey"),
        join: {
          from: "persons.surveyId",
          to: "surveys.id",
        },
      },
    };
  }
}
