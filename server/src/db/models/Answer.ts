import { Model } from "objection";
import { Question } from "./Question";
import path from "path";

export class Answer extends Model {
  static get tableName() {
    return "answers";
  }

  id!: string;
  questionId!: string;

  question!: Question;

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
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "Question"),
        join: {
          from: "answers.questionId",
          to: "questions.id",
        },
      },
    };
  }
}
