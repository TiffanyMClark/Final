if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const moviesRouter = require("../src/movies/movies.router");
const theatersRouter = require("../src/theaters/theaters.router");
const reviewsRouter = require("../src/reviews/reviews.router");

// TODO: Add your code here
app.use(express.json());
app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

// Not found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

module.exports = app;
