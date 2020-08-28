import { Model } from "objection";
import { Survey } from "./Survey";
import path from "path";

export class Question extends Model {
  static get tableName() {
    return "questions";
  }

  id!: string;
  text!: string;
  type!: string;
  order!: number;
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
          from: "questions.surveyId",
          to: "surveys.id",
        },
      },
    };
  }
}
