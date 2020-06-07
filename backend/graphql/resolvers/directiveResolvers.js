module.exports = {
  isAuthenticated: (next, source, args, context, info) => {
    const token = context.req.headers.authorization;

    if (!token) {
      return new Error(
        `You must be authenticated to access "${info.fieldName}"`
      );
    }
    try {
      if (context.req.user) {
        return next();
      } else return new Error(`Invalid token given`);
    } catch (err) {
      throw new Error(
        `You must be authenticated to access "${info.fieldName}"`
      );
    }
  },

  hasRoleOf: (next, source, args, context, info) => {
    const token = context.req.headers.authorization;
    if (!token) {
      throw new Error(
        `You must be authenticated to access "${info.fieldName}"`
      );
    }
    try {
      if (context.req.user) {
        if (context.req.user.role.includes(args.role)) {
          return next();
        } else {
          return new Error(
            `You must be ${args.role} to access "${info.fieldName}"`
          );
        }
      } else
        return new Error(
          `Invalid token given or role denied to access this feature`
        );
    } catch (err) {
      throw new Error(
        `You must be authenticated to access "${info.fieldName}"`
      );
    }
  },
};
