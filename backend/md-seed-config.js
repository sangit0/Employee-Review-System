const mongoose = require("mongoose");
const { mongo } = require("./config/env-vars");
const UsersSeeder = require("./seeders/users.seeder");
const PerformancesSeeder = require("./seeders/performances.seeder");

const mongoURL = mongo;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */

const seedersList = {
  UsersSeeder,
  PerformancesSeeder,
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
const dropdb = async () => mongoose.connection.db.dropDatabase();

module.exports = {
  seedersList,
  connect,
  dropdb,
};
