"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable("companies", (table) => {
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
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTableIfExists("companies");
    });
}
