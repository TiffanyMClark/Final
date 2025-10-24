exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.increments("movies_theaters_id").primary();
    table.boolean("is_showing").defaultTo(true);
    table.timestamps(true, true);

    table
      .integer("movie_id")
      .unsigned()
      .notNullable()
      .references("movie_id")
      .inTable("movies")
      .onDelete("CASCADE");

    table
      .integer("theater_id")
      .unsigned()
      .notNullable()
      .references("theater_id")
      .inTable("theaters")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("movies_theaters");
};
