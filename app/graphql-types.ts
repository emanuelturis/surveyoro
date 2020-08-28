export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IQuery = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  user: IUser;
  survey: ISurvey;
  question: IQuestion;
};


export type IQuerySurveyArgs = {
  id: Scalars['ID'];
};


export type IQueryQuestionArgs = {
  id: Scalars['ID'];
};

export type IUser = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  surveys?: Maybe<Array<ISurvey>>;
};

export type ISurvey = {
  __typename?: 'Survey';
  id: Scalars['ID'];
  name: Scalars['String'];
  active: Scalars['Boolean'];
  questions: Array<IQuestion>;
};

export type IQuestion = {
  __typename?: 'Question';
  id: Scalars['ID'];
  text: Scalars['String'];
  type: Scalars['String'];
  order: Scalars['Int'];
  answers: Array<IAnswer>;
};

export type IAnswer = {
  __typename?: 'Answer';
  id: Scalars['ID'];
  text: Scalars['String'];
  order: Scalars['Int'];
};

export type IMutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  register: Scalars['Boolean'];
  login: IUserWithToken;
  createSurvey: ISurvey;
  deleteSurvey: Scalars['Boolean'];
  updateSurvey: ISurvey;
  createQuestion: IQuestion;
  deleteQuestion: Scalars['Boolean'];
  updateQuestion: IQuestion;
  reorderQuestions: Scalars['Boolean'];
  createAnswer: IAnswer;
  updateAnswer: IAnswer;
  deleteAnswer: Scalars['Boolean'];
  reorderAnswers: Scalars['Boolean'];
  addSubmission: Scalars['Boolean'];
};


export type IMutationRegisterArgs = {
  input: IRegisterInput;
};


export type IMutationLoginArgs = {
  input: ILoginInput;
};


export type IMutationCreateSurveyArgs = {
  name: Scalars['String'];
};


export type IMutationDeleteSurveyArgs = {
  id: Scalars['ID'];
};


export type IMutationUpdateSurveyArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
  active: Scalars['Boolean'];
};


export type IMutationCreateQuestionArgs = {
  surveyId: Scalars['ID'];
  type: Scalars['String'];
  order: Scalars['Int'];
};


export type IMutationDeleteQuestionArgs = {
  id: Scalars['ID'];
  surveyId: Scalars['ID'];
};


export type IMutationUpdateQuestionArgs = {
  id: Scalars['ID'];
  surveyId: Scalars['ID'];
  text: Scalars['String'];
};


export type IMutationReorderQuestionsArgs = {
  input: IReorderQuestionsInput;
};


export type IMutationCreateAnswerArgs = {
  questionId: Scalars['ID'];
  surveyId: Scalars['ID'];
  order: Scalars['Int'];
};


export type IMutationUpdateAnswerArgs = {
  id: Scalars['ID'];
  questionId: Scalars['ID'];
  surveyId: Scalars['ID'];
  text: Scalars['String'];
};


export type IMutationDeleteAnswerArgs = {
  id: Scalars['ID'];
  questionId: Scalars['ID'];
  surveyId: Scalars['ID'];
};


export type IMutationReorderAnswersArgs = {
  input: IReorderAnswersInput;
};


export type IMutationAddSubmissionArgs = {
  person: IPersonInput;
  submission: Array<ISubmissionInput>;
  surveyId: Scalars['String'];
};

export type IRegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ILoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type IUserWithToken = {
  __typename?: 'UserWithToken';
  user: IUser;
  token: Scalars['String'];
};

export type IReorderQuestionsInput = {
  surveyId: Scalars['ID'];
  indexedIds: Array<IIndexedId>;
  startIndex: Scalars['Int'];
  endIndex: Scalars['Int'];
};

export type IIndexedId = {
  id: Scalars['ID'];
  index: Scalars['Int'];
};

export type IReorderAnswersInput = {
  surveyId: Scalars['ID'];
  questionId: Scalars['ID'];
  indexedIds: Array<IIndexedId>;
  startIndex: Scalars['Int'];
  endIndex: Scalars['Int'];
};

export type IPersonInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type ISubmissionInput = {
  questionId: Scalars['ID'];
  answerId?: Maybe<Scalars['ID']>;
  answerText: Scalars['String'];
};

export type IPerson = {
  __typename?: 'Person';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  answers: Array<IAnswer>;
};

export type ISubmission = {
  __typename?: 'Submission';
  id: Scalars['ID'];
  person: IPerson;
  question: IQuestion;
  answer: Scalars['String'];
};
