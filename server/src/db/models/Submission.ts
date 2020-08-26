import { Model } from "objection";
import { Person } from "./Person";
import { Question } from "./Question";
import { Answer } from "./Answer";
import { Survey } from "./Survey";
import path from "path";

export class Submission extends Model {
  static get tableName() {
    return "submissions";
  }

  id!: string;
  personId!: string;
  questionId!: string;
  answerId!: string;

  person!: Person;
  survey!: Survey;
  question!: Question;
  answer!: Answer;

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
      person: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "Person"),
        join: {
          from: "submissions.personId",
          to: "persons.id",
        },
      },
      survey: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "Survey"),
        join: {
          from: "submissions.surveyId",
          to: "surveys.id",
        },
      },
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "Question"),
        join: {
          from: "submissions.questionId",
          to: "questions.id",
        },
      },
      answer: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, "Answer"),
        join: {
          from: "submissions.answerId",
          to: "answers.id",
        },
      },
    };
  }
}
