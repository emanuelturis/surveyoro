import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table) => {
    table.string("confirmationToken");
    table.boolean("isConfirmed").notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("confirmationToken");
    table.dropColumn("isConfirmed");
  });
}
