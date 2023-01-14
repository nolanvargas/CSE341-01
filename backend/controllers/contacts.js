// Our own database client
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllContacts = async (req, res, next) => {
  // Chained statement
  // mongodb.getDb -> database client
  // .db() -> here is where i would put the name of the database
  // .collection('user') -> ?
  // .find() -> ?
  const result = await mongodb.getDb().db().collection("contacts").find();

  // Convert the result to an array, then set the response header and status
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

// const getSingleContact = async (req, res, next) => {
//   const result = await mongodb.getDb().db().collection("contacts").find(req);
//   result.toArray().then((lists) => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(lists);
//   });
// };

const getSingleContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  console.log(userId);
  const result = await mongodb
    .getDb()
    .db()
    .collection("contacts")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

module.exports = { getAllContacts, getSingleContact };
