const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

// added an extra review exisits function.. oops
async function reviewExists(req, res, next) {
  // TODO: Write your code here
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({
    status: 404,
    message: `Review cannot be found.`,
  });
}

async function destroy(reqt, res) {
  // TODO: Write your code here
  const { reviewId } = req.params;
  await service.delete(reviewId);
  res.sendStatus(204);
}

async function list(req, res) {
  // TODO: Write your code here
  const { movieId } = req.params;
  const reviews = await service.list(movieId);
  res.json({ data: reviews });
}

function hasMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return next();
  }
  methodNotAllowed(req, res, next);
}

function noMovieIdInPath(req, res, next) {
  if (req.params.movieId) {
    return methodNotAllowed(req, res, next);
  }
  next();
}

async function update(req, res) {
  // TODO: Write your code here
  const { reviewId } = req.params;
  const updatedReview = {
    ...req.body.data,
    review_id: reviewId,
  };
  const data = await service.update(updatedReview);
  res.json({ data });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
