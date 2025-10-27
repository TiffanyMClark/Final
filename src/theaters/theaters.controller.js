const service = require("./theaters.service");
const asyncErrorBoundary = require("../../src/errors/asyncErrorBoundary");

async function list(req, res) {
  // TODO: Add your code here
  const data = await service.list();
  res.json({ data });
}
module.exports = {
  list: asyncErrorBoundary(list),
};
