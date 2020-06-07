var User = require('../../models/user.model');
const httpStatus = require('http-status');
const RefreshToken = require('../../models/refreshToken.model');
const moment = require('moment-timezone');
const {
    jwtExpirationInterval
} = require('../../config/env-vars');

generateTokenResponse = (user, accessToken) => {
    const tokenType = 'Bearer';
    const refreshToken = RefreshToken.generate(user).token;
    const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
    return {
        tokenType,
        accessToken,
        refreshToken,
        expiresIn,
    };
}

module.exports = {

    Mutation: {
        register: async (source, args) => {
                try {
                    args = args.userInput;
                    const user = await (new User(args)).save();
                    const userTransformed = user.transform();
                    const token = generateTokenResponse(user, user.token());
                    return {
                        token,
                        user: userTransformed
                    };
                } catch (error) {
                    return User.checkDuplicateEmailError(error);
                }
            },
            login: async (source, args) => {
                try {
                    const {
                        user,
                        accessToken
                    } = await User.findAndGenerateToken(args);
                    const token = generateTokenResponse(user, accessToken);
                    const userTransformed = user.transform();
                    return {
                        token,
                        user: userTransformed
                    }
                } catch (error) {
                    return error;
                }
            }
    }
}
