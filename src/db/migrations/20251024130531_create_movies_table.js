exports.up = function (knex) {
  return knex.schema.createTable("movies", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.integer("runtime_in_minutes");
    table.string("rating");
    table.text("description");
    table.string("image_url");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies");
};
