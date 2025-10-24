exports.up = function (knex) {
  return knex.schema.createTable("reviews", function (table) {
    table.increments("review_id").primary();
    table.text("content").notNullable();
    table.integer("score").notNullable();

    table
      .integer("critic_id")
      .unsigned()
      .notNullable()
      .references("critic_id")
      .inTable("critics")
      .onDelete("CASCADE");

    table
      .integer("movie_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("movies")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("reviews");
};
