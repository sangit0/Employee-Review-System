var User = require("../models/user.model");
const { Seeder } = require("mongoose-data-seed");

const data = [
  {
    email: "admin@sangit.info",
    password: "secret",
    name: "Sangit",
    role: "admin",
  },
  {
    email: "user2@gmail.com",
    password: "secret",
    name: "Barua Sangit",
    role: "user",
  },
];

class UsersSeeder extends Seeder {
  async shouldRun() {
    return User.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

module.exports = UsersSeeder;
