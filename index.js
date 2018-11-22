const express = require('express');
const bodyParser = require('body-parser');

const routes = require("./routes");
const app = express();

// set up mongoose connection
const mongoose = require("mongoose");
let dev_db_url = "mongodb://localhost:27017/recorder";

let mongoDB = dev_db_url;
mongoose.connect(mongoDB, {
  useCreateIndex: true,
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error!'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

let port = 8000;

app.listen(port, () => {
  console.log("Server is up and running on port number "+ port);
});
