var User = require("../../models/user.model");
// const httpStatus = require("http-status");
const RefreshToken = require("../../models/refreshToken.model");
const moment = require("moment-timezone");
const { env, jwtExpirationInterval } = require("../../config/env-vars");
const bcrypt = require("bcryptjs");

generateTokenResponse = (user, accessToken) => {
  const tokenType = "Bearer";
  const refreshToken = RefreshToken.generate(user).token;
  const expiresIn = moment().add(jwtExpirationInterval, "minutes");
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn,
  };
};

module.exports = {
  Query: {
    Users: () => User.find().exec(),
    User: (obj, args) => {
      //console.log(User.findOne(args).exec());
      return User.find(args).exec();
    },
  },
  Mutation: {
    //for self register
    createUser: async (source, args) => {
      try {
        args = args.userInput;
        const user = await new User(args).save();
        const userTransformed = user.transform();
        const token = generateTokenResponse(user, user.token());
        return {
          token,
          user: userTransformed,
        };
      } catch (error) {
        return User.checkDuplicateEmailError(error);
      }
    },
    updateUser: async (source, params) => {
      try {
        return User.findByIdAndUpdate(
          params.id,
          {
            $set: {
              name: params.userInput.name,
              email: params.userInput.email,
              password: await bcrypt.hash(params.userInput.password, 10),
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
  },
};
