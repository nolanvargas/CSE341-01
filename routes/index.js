const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.send("Sarah Birch");
});
routes.get("/egg", (req, res) => {
  res.send("meow");
});

module.exports = routes;
