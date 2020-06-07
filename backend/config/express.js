const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const routes = require('../routes/v1');
const compress = require('compression');
const strategies = require('./jwt');
const error = require('../middlewares/error');
const express = require('express');

//defining GraphQL
const expressGraphQL = require('express-graphql');
const { isAuth } = require('../middlewares/authentication');
const { addDirectiveResolveFunctionsToSchema } =  require( 'graphql-directive');
const graphqlvars = require('./graphql');


const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());

//authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);



// if method such as PUT or DELETE doesnot support override
app.use(methodOverride());

app.use(helmet());
app.use(cors());


//api v1 routes
app.use('/v1', routes);


// Attach a resolver map to schema
addDirectiveResolveFunctionsToSchema(graphqlvars.schema,graphqlvars.directiveResolvers);
app.use('/graph-api', cors(),isAuth(),(req, res) => {
  expressGraphQL({
    schema: graphqlvars.schema,
    graphiql: true,
    context: { req }
  })(req, res)});


// if error by API convert it.
app.use(error.convertAPIError);

// catch 404 error handler
app.use(error.notFoundError);
app.use(error.handler);

module.exports = app;
