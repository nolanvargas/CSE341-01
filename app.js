// Wonderful Express module
const express = require("express");

// This will be used to parse the body of the request
const bodyParser = require("body-parser");

// Our own module with the code to set it up ready to be called
const mongodb = require("./db/connect");

// Our own routes file
const contactsRoutes = require("./routes/contacts");

// If we push this to render, we'll let them decide the port, otherwise it is 8080
const port = process.env.PORT || 8080;

// Initialize express
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Options for swagger explorer
var options = {
  explorer: true,
};

// Pass in middleware, that will be used before every request
app
  // Swagger document
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  // Make our routes available for use
  .use("/contacts", contactsRoutes)
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Initialize our client by calling this function? method?
// Pass a callback function to start the server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
