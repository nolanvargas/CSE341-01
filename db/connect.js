// This is a package that helps us use eniormental variables 'env'
const dotenv = require("dotenv");

// Load the environment variables from the .env file into 'process.env'.
dotenv.config();

// Get the MongoDB client so we can use it to connect to the database
const MongoClient = require("mongodb").MongoClient;

let _db;

/**
 * Initializes the database client
 * @param {*} callback - Pass in a callback to start the server
 * @returns the result of the callback, if any
 */
const initDb = (callback) => {
  // If the _db variable is not empty
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }
  // Call the connect method and give it our connection string (.env file)
  MongoClient.connect(process.env.MONGODB_URI)
    // Then pass in the client returned from the line above into an anonymous function
    .then((client) => {
      // Set our local _db variable to the client
      _db = client;
      // Calls the callback function, with null as the error and _db as the client
      callback(null, _db);
    })
    .catch((err) => {
      // Calls the callback function with just the error
      callback(err);
    });
};

/**
 * Get the database client
 * @returns Database Client if initialized, otherwise will throw an error
 */
const getDb = () => {
  // If the _db variable is empty
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
