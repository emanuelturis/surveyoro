import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("surveys", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.boolean("active").defaultTo(false).notNullable();
      table.string("name").notNullable();
      table
        .uuid("userId")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .notNullable();
      table.timestamp("createdAt").notNullable();
      table.timestamp("updatedAt").notNullable();
    })
    .createTable("questions", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table
        .uuid("surveyId")
        .unsigned()
        .references("id")
        .inTable("surveys")
        .onDelete("CASCADE")
        .notNullable();
      table.timestamp("createdAt").notNullable();
      table.timestamp("updatedAt").notNullable();
    })
    .createTable("answers", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("text").notNullable();
      table
        .uuid("questionId")
        .unsigned()
        .references("id")
        .inTable("questions")
        .onDelete("CASCADE")
        .notNullable();
      table.timestamp("createdAt").notNullable();
      table.timestamp("updatedAt").notNullable();
    })
    .createTable("persons", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("firstName").notNullable();
      table.string("lastName").notNullable();
      table.string("email").notNullable();
      table.timestamp("createdAt").notNullable();
      table.timestamp("updatedAt").notNullable();
    })
    .createTable("submissions", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table
        .uuid("personId")
        .unsigned()
        .references("id")
        .inTable("persons")
        .onDelete("CASCADE")
        .notNullable();
      table
        .uuid("surveyId")
        .unsigned()
        .references("id")
        .inTable("surveys")
        .onDelete("CASCADE")
        .notNullable();
      table
        .uuid("questionId")
        .unsigned()
        .references("id")
        .inTable("questions")
        .onDelete("CASCADE")
        .notNullable();
      table
        .uuid("answerId")
        .unsigned()
        .references("id")
        .inTable("answers")
        .onDelete("CASCADE")
        .notNullable();
      table.timestamp("createdAt").notNullable();
      table.timestamp("updatedAt").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("surveys", (table) => {
      table.dropForeign(["userId"]);
      table.dropColumn("userId");
    })
    .alterTable("submissions", (table) => {
      table.dropForeign(["personId"]);
      table.dropForeign(["surveyId"]);
      table.dropForeign(["questionId"]);
      table.dropForeign(["answerId"]);
      table.dropColumn("surveyId");
      table.dropColumn("personId");
      table.dropColumn("questionId");
      table.dropColumn("answerId");
    })
    .alterTable("answers", (table) => {
      table.dropForeign(["questionId"]);
      table.dropColumn("questionId");
    })
    .alterTable("questions", (table) => {
      table.dropForeign(["surveyId"]);
      table.dropColumn("surveyId");
    })
    .dropTableIfExists("surveys")
    .dropTableIfExists("questions")
    .dropTableIfExists("answers")
    .dropTableIfExists("persons")
    .dropTableIfExists("submissions");
}
