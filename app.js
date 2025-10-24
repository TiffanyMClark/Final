if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const moviesRouter = require("../src/movies/movies.router");
const theatersRouter = require("../src/theaters/theaters.router");
const reviewsRouter = require("../src/reviews/reviews.router");

// TODO: Add your code here

module.exports = app;
