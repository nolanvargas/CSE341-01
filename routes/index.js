const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.send("cat");
});
routes.get("/egg", (req, res) => {
  res.send("meow");
});

module.exports = routes;
