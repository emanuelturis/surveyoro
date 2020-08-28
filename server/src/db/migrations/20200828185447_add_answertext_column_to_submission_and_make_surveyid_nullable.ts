import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("submissions", (table) => {
    table.string("answerText").notNullable();
    table.uuid("answerId").nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("submissions", (table) => {
    table.dropColumn("answerText");
    table.uuid("answerId").notNullable().alter();
  });
}
