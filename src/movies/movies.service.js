const db = require("../db/connection");

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}
async function update(movie_id, updatedMovie) {
  return db("movies").where({ movie_id }).update(updatedMovie, "*");
}
async function destroy(movie_id) {
  return db("movies").where({ movie_id }).del();
}

async function read(movie_id) {
  // TODO: Add your code here
  return db("movies").select("*").where({ movie_id }).first();
}

module.exports = {
  list,
  read,

  update,
  destroy,
};
