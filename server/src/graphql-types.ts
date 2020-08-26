import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IAnswer = {
  __typename?: 'Answer';
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type ILoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type IMutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  register: Scalars['Boolean'];
  login: IUserWithToken;
  createSurvey: ISurvey;
  deleteSurvey: Scalars['Boolean'];
  updateSurvey: Scalars['Boolean'];
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

export type IPerson = {
  __typename?: 'Person';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  answers: Array<IAnswer>;
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

export type IQuestion = {
  __typename?: 'Question';
  id: Scalars['ID'];
  answers?: Maybe<Array<IAnswer>>;
};

export type IRegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ISubmission = {
  __typename?: 'Submission';
  id: Scalars['ID'];
  person: IPerson;
  question: IQuestion;
  answer: IAnswer;
};

export type ISurvey = {
  __typename?: 'Survey';
  id: Scalars['ID'];
  name: Scalars['String'];
  active: Scalars['Boolean'];
  questions?: Maybe<Array<IQuestion>>;
};

export type IUser = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  surveys?: Maybe<Array<ISurvey>>;
};

export type IUserWithToken = {
  __typename?: 'UserWithToken';
  user: IUser;
  token: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<IUser>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Survey: ResolverTypeWrapper<ISurvey>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Question: ResolverTypeWrapper<IQuestion>;
  Answer: ResolverTypeWrapper<IAnswer>;
  Mutation: ResolverTypeWrapper<{}>;
  RegisterInput: IRegisterInput;
  LoginInput: ILoginInput;
  UserWithToken: ResolverTypeWrapper<IUserWithToken>;
  Person: ResolverTypeWrapper<IPerson>;
  Submission: ResolverTypeWrapper<ISubmission>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  User: IUser;
  ID: Scalars['ID'];
  Survey: ISurvey;
  Boolean: Scalars['Boolean'];
  Question: IQuestion;
  Answer: IAnswer;
  Mutation: {};
  RegisterInput: IRegisterInput;
  LoginInput: ILoginInput;
  UserWithToken: IUserWithToken;
  Person: IPerson;
  Submission: ISubmission;
};

export type IAnswerResolvers<ContextType = any, ParentType extends IResolversParentTypes['Answer'] = IResolversParentTypes['Answer']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  register?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationRegisterArgs, 'input'>>;
  login?: Resolver<IResolversTypes['UserWithToken'], ParentType, ContextType, RequireFields<IMutationLoginArgs, 'input'>>;
  createSurvey?: Resolver<IResolversTypes['Survey'], ParentType, ContextType, RequireFields<IMutationCreateSurveyArgs, 'name'>>;
  deleteSurvey?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationDeleteSurveyArgs, 'id'>>;
  updateSurvey?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType, RequireFields<IMutationUpdateSurveyArgs, 'id' | 'name' | 'active'>>;
};

export type IPersonResolvers<ContextType = any, ParentType extends IResolversParentTypes['Person'] = IResolversParentTypes['Person']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  firstName?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  answers?: Resolver<Array<IResolversTypes['Answer']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  survey?: Resolver<IResolversTypes['Survey'], ParentType, ContextType, RequireFields<IQuerySurveyArgs, 'id'>>;
};

export type IQuestionResolvers<ContextType = any, ParentType extends IResolversParentTypes['Question'] = IResolversParentTypes['Question']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  answers?: Resolver<Maybe<Array<IResolversTypes['Answer']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ISubmissionResolvers<ContextType = any, ParentType extends IResolversParentTypes['Submission'] = IResolversParentTypes['Submission']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  person?: Resolver<IResolversTypes['Person'], ParentType, ContextType>;
  question?: Resolver<IResolversTypes['Question'], ParentType, ContextType>;
  answer?: Resolver<IResolversTypes['Answer'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ISurveyResolvers<ContextType = any, ParentType extends IResolversParentTypes['Survey'] = IResolversParentTypes['Survey']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  active?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
  questions?: Resolver<Maybe<Array<IResolversTypes['Question']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IUserResolvers<ContextType = any, ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  firstName?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  surveys?: Resolver<Maybe<Array<IResolversTypes['Survey']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IUserWithTokenResolvers<ContextType = any, ParentType extends IResolversParentTypes['UserWithToken'] = IResolversParentTypes['UserWithToken']> = {
  user?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  token?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IResolvers<ContextType = any> = {
  Answer?: IAnswerResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  Person?: IPersonResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  Question?: IQuestionResolvers<ContextType>;
  Submission?: ISubmissionResolvers<ContextType>;
  Survey?: ISurveyResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
  UserWithToken?: IUserWithTokenResolvers<ContextType>;
};


