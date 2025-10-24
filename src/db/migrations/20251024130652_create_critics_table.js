exports.up = function (knex) {
  return knex.schema.createTable("critics", function (table) {
    table.increments("critic_id").primary();
    table.string("preferred_name").notNullable();
    table.string("surname").notNullable();
    table.string("organization_name").notNullable();
    table.string("created_at").defaultTo(knex.fn.now());
    table.string("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("critics");
};
