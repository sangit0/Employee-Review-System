var User = require("../../models/user.model");
const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    //only users with role of user
    Employees: () =>
      User.find({
        role: "user",
      }).exec(),
    Employee: (obj, args) => {
      //console.log(User.findOne(args).exec());
      return User.find({ id: args.id }).exec();
    },
  },
  Mutation: {
    //for self register
    createEmployee: async (source, args) => {
      try {
        args = args.employeeInput;
        const user = await new User(args).save();
        return user;
      } catch (error) {
        return User.checkDuplicateEmailError(error);
      }
    },
    updateEmployee: async (source, params) => {
      try {
        // conso  le.log(params);

        return User.findByIdAndUpdate(
          params.id,
          {
            $set: {
              name: params.employeeInput.name,
              email: params.employeeInput.email,
            },
          },
          {
            new: true,
          }
        );
      } catch (error) {
        return User.checkDuplicateEmailError(error);
      }
    },
    deleteEmployee: async (source, params) => {
      try {
        // conso  le.log(params);

        return User.findByIdAndDelete(params.id);
      } catch (error) {
        return User.checkDuplicateEmailError(error);
      }
    },
  },
};
