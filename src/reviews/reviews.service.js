const db = require("../db/connection");

const tableName = "reviews";

async function destroy(reviewId) {
  // TODO: Write your code here
  return db(tableName).where({ review_id: reviewId }).del();
}

async function list(movie_id) {
  // TODO: Write your code here
  // it checks the movie id and returns the review for thst movie
  const query = db(tableName).select("*");
  if (movie_id) query.where({ movie_id });
  const rows = await query;
  return Promise.all(rows.map(setCritic));
}

async function read(reviewId) {
  // TODO: Write your code here
  // it reads and returns the review with the given review id
  const review = await db(tableName).where({ review_id: reviewId }).first();
  if (!review) return null;
  return setCritic(review);
}

async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  create,
  update,
};
