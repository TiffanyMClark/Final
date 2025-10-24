const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  // TODO: Write your code here
  const { reviewId } = request.params;
  const review = await service.read(reviewId);
  if (review) {
    response.locals.review = review;
    return next();
  }
  return;

  next({});
}

async function destroy(request, response) {
  // TODO: Write your code here
  const { reviewId } = request.params;
  await service.delete(reviewId);
  response.sendStatus(204);
}

async function list(request, response) {
  // TODO: Write your code here
  const { movieId } = request.params;
  const reviews = await service.list(movieId);
  response.json({ data: reviews });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  // TODO: Write your code here
  const { reviewId } = request.params;
  const updatedReview = {
    ...request.body.data,
    review_id: reviewId,
  };
  const data = await service.update(updatedReview);
  response.json({ data });
}

module.exports = {
  create: [
    noMovieIdInPath,
    asyncErrorBoundary(async (request, response, next) => {
      const { data } = request.body;
      const createdReview = await service.create(data);
      response.status(201).json({ data: createdReview });
    }),
  ],

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
