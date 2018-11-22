let router = require("express").Router();

let user = require("./user");

// list routes
router.use('/user', user);

module.exports = router;