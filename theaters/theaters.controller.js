const service = require("./theaters.service");
const asyncErrorBoundary = require("../../server/src/errors/asyncErrorBoundary");

async function list(request, response) {
  // TODO: Add your code here
  response.json({});
}

module.exports = {
  list: asyncErrorBoundary(list),
};
