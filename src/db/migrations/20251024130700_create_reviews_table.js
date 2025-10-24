exports.up = function (knex) {
  return knex.schema.createTable("reviews", function (table) {
    table.increments("review_id").primary();
    table.text("content").notNullable();
    table.integer("score").notNullable();
    table.string("created_at").defaultTo(knex.fn.now());
    table.string("updated_at").defaultTo(knex.fn.now());

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
      .references("movie_id")
      .inTable("movies")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("reviews");
};
