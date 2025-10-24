exports.up = function (knex) {
  return knex.schema.createTable("theaters", (table) => {
    // gives every theater a unique id
    table.increments("theater_id").primary();
    table.string("name").notNullable();
    // this one IS required
    table.string("address_line_1").notNullable();
    // this one doesn't HAVE to be filled
    table.string("address_line_2");
    table.string("city").notNullable();
    table.string("state", 2).notNullable();
    table.string("zip", 10).notNullable();
    table.string("created_at").defaultTo(knex.fn.now());
    table.string("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("theaters");
};
