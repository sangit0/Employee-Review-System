const path = require('path');
require('dotenv-safe').load({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: process.env.MONGO_URL
};
