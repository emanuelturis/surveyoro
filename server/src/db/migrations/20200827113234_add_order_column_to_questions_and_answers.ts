import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("questions", (table) => {
      table.integer("order").notNullable();
    })
    .alterTable("answers", (table) => {
      table.integer("order").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable("questions", (table) => {
      table.dropColumn("order");
    })
    .alterTable("answers", (table) => {
      table.dropColumn("order");
    });
}
