const { ApolloServer } = require('@apollo/server');
const { resolvers } = require('../resolvers');
const typeDefs = require('../typeDefs');

it('returns hello with the provided name', async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const response = await testServer.executeOperation({
    query: `#graphql
      query Books {
        books {
          title
          author
        }
      }
    `,
  });

  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data).toEqual({
    books: [
      { author: 'Kate Chopin', title: 'The Awakening' },
      { author: 'Paul Auster', title: 'City of Glass' },
    ],
  });
});
