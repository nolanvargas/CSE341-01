const express = require("express");

const contactsController = require("../controllers/contacts");

const router = express.Router();

router.get("/", contactsController.getAllContacts);
router.get("/:id", contactsController.getSingleContact);
router.post("/", contactsController.postContact);
router.put("/:id", contactsController.updateContact);
router.delete("/:id", contactsController.deleteContact);
module.exports = router;
