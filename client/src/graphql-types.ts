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
};


export type IQuerySurveyArgs = {
  id: Scalars['String'];
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
  questions?: Maybe<Array<IQuestion>>;
};

export type IQuestion = {
  __typename?: 'Question';
  id: Scalars['ID'];
  answers?: Maybe<Array<IAnswer>>;
};

export type IAnswer = {
  __typename?: 'Answer';
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type IMutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  register: Scalars['Boolean'];
  login: IUserWithToken;
  createSurvey: ISurvey;
  deleteSurvey: Scalars['Boolean'];
  updateSurvey: ISurvey;
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
  answer: IAnswer;
};
