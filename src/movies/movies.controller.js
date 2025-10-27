/* eslint-disable unicorn/prefer-module */
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  // TODO: Add your code here.
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

async function read(_req, res) {
  // TODO: Add your code here
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function list(req, res) {
  // TODO: Add your code here.
  const { is_showing } = req.query;
  const movies = await service.list(is_showing);

  res.json({ data: movies });
}

module.exports = {
  movieExists,
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
