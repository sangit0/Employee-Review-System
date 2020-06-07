var Performance = require("../models/performance.model");
const { Seeder } = require("mongoose-data-seed");

const data = [
  {
    name: "Attendance",
  },
  {
    name: "Innovation and Creativity",
  },
  {
    name: "Leadership",
  },
  {
    name: "Communication Skills",
  },
  {
    name: "Collaboration and Teamwork",
  },
];

class PerformancesSeeder extends Seeder {
  async shouldRun() {
    return Performance.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return Performance.create(data);
  }
}

module.exports = PerformancesSeeder;
