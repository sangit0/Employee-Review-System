var model = require("../../models/performance.model");

module.exports = {
  Query: {
    Performances: () => model.find().exec(),
    Performance: (obj, args) => {
      return model.findOne(args).exec();
    },
  },
  Mutation: {
    addPerformance(source, args) {
      return model.create(args);
    },
    updatePerformance(source, params) {
      return model
        .findByIdAndUpdate(
          params.id,
          {
            $set: {
              name: params.name,
            },
          },
          { new: true }
        )
        .catch((err) => new Error(err));
    },
    deletePerformance: async (source, params) => {
      try {
        return model.findByIdAndDelete(params.id);
      } catch (error) {
        return error;
      }
    },
  },
};
