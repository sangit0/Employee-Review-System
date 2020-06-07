const { makeExecutableSchema } = require('graphql-tools');

//seting up GraphQL
const typeDefs = require('../graphql/schema/index');
const resolvers = require('../graphql/resolvers/index');
const directiveResolvers = require('../graphql/resolvers/directiveResolvers');
const schema = makeExecutableSchema({ typeDefs, resolvers });


module.exports = {
 schema: schema,
 directiveResolvers:directiveResolvers
};
