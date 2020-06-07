const mongoose = require("mongoose");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const ErrorsMessage = require("../helpers/error-api");
const { env, jwtSecret, jwtExpirationInterval } = require("../config/env-vars");
const { roles } = require("./roles.model");
const moment = require("moment-timezone");
const Schema = mongoose.Schema;

/**
 * User Roles defining
 */
const userRoles = [];
for (let key in roles) {
  if (roles[key] !== "logged_user") userRoles.push(roles[key]);
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    name: {
      type: String,
      maxlength: 128,
      index: true,
      trim: true,
    },
    role: {
      type: String,
      enum: userRoles,
      default: "user",
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "EmployeeReview",
    },
    assigned_employee: [
      {
        feedback: {
          type: Boolean,
          default: false,
        },
        employee_id: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * - pre-save hooks
 */
userSchema.pre("save", async function save(next) {
  try {
    if (!this.isModified("password")) return next();

    const rounds = env === "test" ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = ["id", "name", "email", "role", "createdAt"];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  token() {
    const playload = {
      exp: moment().add(jwtExpirationInterval, "minutes").unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.encode(playload, jwtSecret);
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
});

/**
 * Statics
 */
userSchema.statics = {
  userRoles,
  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new ErrorsMessage({
        message: "User does not exist",
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  async findAndGenerateToken(options) {
    const { email, password, refreshObject } = options;
    if (!email)
      throw new ErrorsMessage({
        message: "An email is required to generate a token",
      });

    const user = await this.findOne({ email }).exec();
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
    };
    if (password) {
      if (user && (await user.passwordMatches(password))) {
        return { user, accessToken: user.token() };
      }
      err.message = "Incorrect email or password";
    } else if (refreshObject && refreshObject.userEmail === email) {
      if (moment(refreshObject.expires).isBefore()) {
        err.message = "Invalid refresh token.";
      } else {
        return { user, accessToken: user.token() };
      }
    } else {
      err.message = "Incorrect email or refreshToken";
    }
    throw new ErrorsMessage(err);
  },

  checkDuplicateEmailError(error) {
    if (error.name === "MongoError" && error.code === 11000) {
      return new ErrorsMessage({
        message: "Validation Error",
        errors: [
          {
            field: "email",
            location: "body",
            messages: ['"email" already exists'],
          },
        ],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },
};

module.exports = mongoose.model("User", userSchema);
