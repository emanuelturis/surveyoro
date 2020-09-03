import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("persons", (table) => {
    table
      .uuid("surveyId")
      .unsigned()
      .references("id")
      .inTable("surveys")
      .onDelete("CASCADE")
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("persons", (table) => {
    table.dropForeign(["surveyId"]);
    table.dropColumn("surveyId");
  });
}
