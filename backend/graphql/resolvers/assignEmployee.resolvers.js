var model = require("../../models/user.model");

module.exports = {
  Query: {
    UserAssignedEmployee: (obj, args) => {
      return model
        .find({ _id: args._id })
        .populate({ path: "assigned_employee.employee_id", select: "name" })
        .exec();
    },

    UserAssignedEmployeeOnlyFeedBack: (obj, args) => {
      return model
        .find({
          _id: args._id,
          assigned_employee: {
            $elemMatch: { feedback: args.assignedEmployee.feedback },
          },
        })
        .populate({ path: "assigned_employee.employee_id", select: "name" })
        .exec();
    },
  },
  Mutation: {
    assignEmployee(source, params) {
      return model
        .findOneAndUpdate(
          {
            _id: params._id,
          },

          {
            $set: {
              assigned_employee: params.assigned_employee,
            },
          },
          { upsert: true }
        )
        .catch((err) => new Error(err));
    },
    updateAssignEmployee(source, params) {
      // console.log(params.assigned_employee);

      return model
        .findOneAndUpdate(
          {
            _id: params._id,
            "assigned_employee._id": params.assigned_document_id,
          },
          {
            $set: {
              "assigned_employee.$.feedback": params.assigned_employee.feedback,
            },
          },
          { new: true }
        )
        .catch((err) => new Error(err));
    },
  },
};
