var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Performance = new Schema(
  {
    name: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
  },
  { timestamps: true }
);
var Model = mongoose.model("Performances", Performance);
module.exports = Model;
