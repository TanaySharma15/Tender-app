import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("companies", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("industry").notNullable();
    table.string("location").notNullable();
    table.text("description").notNullable();
    table.string("logo").nullable();
    table.jsonb("services").notNullable().defaultTo("[]");
    table.string("employees").nullable();
    table.string("founded").nullable();
    table.string("website").nullable();
    table.float("rating").defaultTo(0);
    table.integer("reviews").defaultTo(0);
    table.integer("completed_projects").defaultTo(0);
    table.integer("client_satisfaction").defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("companies");
}
