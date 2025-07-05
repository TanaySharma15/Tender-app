import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tenders", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.float("budget").notNullable();
    table.date("deadline").notNullable();
    table
      .integer("created_by")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("tenders");
}
