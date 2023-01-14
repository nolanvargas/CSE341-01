const express = require("express");

const contactsController = require("../controllers/contacts");

const router = express.Router();

// GET /feed/posts
router.get("/", contactsController.getAllContacts);
// localhost:8080/professional/
router.get("/:id", contactsController.getSingleContact);
module.exports = router;
