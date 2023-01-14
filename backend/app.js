// Wonderful Express module
const express = require("express");

// This will be used to parse the body of the request
const bodyParser = require("body-parser");

// Grab the database client object here
const MongoClient = require("mongodb").MongoClient;

// Our own module with the code to set it up ready to be called
const mongodb = require("./db/connect");

// Our own routes file
const contactsRoutes = require("./routes/contacts");

// If we push this to render, we'll let them decide the port, otherwise it is 8080
const port = process.env.PORT || 8080;

// Initialize express
const app = express();

// Pass in middleware, that will be used before every request
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    // This is for cors ??? not really sure actually
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Also not sure about this
    next();
  })
  // Make our routes available for use
  .use("/contacts", contactsRoutes);

// Initialize our client by calling this function? method?
// Pass a callback function to start the server
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
