import { Model } from "objection";
import path from "path";
import { Submission } from "./Submission";
import { User } from "./User";
import { Question } from "./Question";

export class Survey extends Model {
  static get tableName() {
    return "surveys";
  }

  id!: string;
  active!: boolean;
  name!: string;
  userId!: string;

  user!: User;
  questions!: Question[];
  submissions!: Submission[];

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
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "User"),
        join: {
          from: "surveys.userId",
          to: "users.id",
        },
      },
      questions: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, "Question"),
        join: {
          from: "surveys.id",
          to: "questions.surveyId",
        },
      },
      submissions: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, "Submission"),
        join: {
          from: "surveys.id",
          to: "submissions.surveyId",
        },
      },
    };
  }
}
