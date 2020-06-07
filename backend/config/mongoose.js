const mongoose = require('mongoose');
const { mongo, env } = require('./env-vars');

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;
mongoose.connection.on('error', (err) => {
  console.log(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs
if (env === 'development') {
  mongoose.set('debug', true);
}

exports.connect = () => {
  mongoose.connect(mongo, {
    keepAlive: 1,
    useNewUrlParser: true,
  });
  return mongoose.connection;
};
