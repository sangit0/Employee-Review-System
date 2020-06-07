var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};
var employeeSchema = new Schema(
  {
    feedback_from_employee_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    performance_reviews: [
      {
        performance_type: String,
        feedback: String,
        performance: {
          type: Schema.Types.ObjectId,
          ref: "Performances",
        },
      },
    ],
    feedback_to_employee_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
var Model = mongoose.model("EmployeeReview", employeeSchema);
module.exports = Model;
