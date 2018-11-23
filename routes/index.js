let router = require("express").Router();
let express = require("express");
let cors = require('cors')
let app = express();
let user = require("./user");

app.use(cors);
app.options('*', cors());
// list routes
router.use('/user', user);

module.exports = router;