exports.up = function (knex) {
  return knex.schema.createTable("movies", function (table) {
    table.increments("movie_id").primary();
    table.string("title").notNullable();
    table.integer("runtime_in_minutes");
    table.string("rating");
    table.text("description");
    table.string("image_url");

    table.string("created_at").defaultTo(knex.fn.now());
    table.string("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movies");
};
