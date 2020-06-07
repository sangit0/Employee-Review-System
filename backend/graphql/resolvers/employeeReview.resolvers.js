var model = require("../../models/employeeReview.model");

module.exports = {
  Query: {
    EmployeeReviews: () => model.find().exec(),
    EmployeeReview: (obj, args) => {
      return (
        model
          .findOne(args)
          // .populate({ path: "performance_reviews.performance", select: "name" })
          .exec()
      );
    },
  },
  Mutation: {
    addEmployeeReview(source, params) {
      return model
        .findOneAndUpdate(
          {
            feedback_from_employee_id: params.feedback_from_employee_id,
            feedback_to_employee_id: params.feedback_to_employee_id,
          },
          {
            $set: {
              performance_reviews: params.performance_reviews,
              feedback_from_employee_id: params.feedback_from_employee_id,
              feedback_to_employee_id: params.feedback_to_employee_id,
            },
          },
          {
            upsert: true,
          }
        )
        .catch((err) => new Error(err));
    },
  },
};
