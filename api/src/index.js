const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { resolvers } = require('./resolvers');
const typeDefs = require('./typeDefs');
const dotenv = require('dotenv');

dotenv.config();

const DEFAULT_SERVER_PORT = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: {
    port: process.env.PORT ?? DEFAULT_SERVER_PORT,
  },
}).then(({ url }) => console.log(`🚀 Server ready at: ${url}`));
