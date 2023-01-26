// Our own database client
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("contacts").find();

    // Convert the result to an array, then set the response header and status
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// const getSingleContact = async (req, res, next) => {
//   const result = await mongodb.getDb().db().collection("contacts").find(req);
//   result.toArray().then((lists) => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(lists);
//   });
// };

const getSingleContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const postContact = async (req, res) => {
  try {
    console.log(req.body);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      color: req.body.color,
      birthday: req.body.birthday,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    let updatedContact = {};
    Object.entries(req.body).forEach(([key, value]) => {
      updatedContact[key] = value;
    });

    console.log(updatedContact);
    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .updateOne({ _id: userId }, { $set: updatedContact });

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("contacts")
      .remove({ _id: userId }, true);
    if (response.deletedCount > 0) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  postContact,
  updateContact,
  deleteContact,
};
