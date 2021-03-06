import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("questions", (table) => {
    table.string("type").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("questions", (table) => {
    table.dropColumn("type");
  });
}
