Promise = require('bluebird');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const { port, env } = require('./config/env-vars');

// open connection
mongoose.connect();

// listen to requests
app.listen(port, () => console.log(`server started on port ${port} (${env})`));

module.exports = app;
