const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../../src/errors/methodNotAllowed");

// TODO: Add your routes here
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
