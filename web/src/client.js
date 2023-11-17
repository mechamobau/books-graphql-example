import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const typeDefs = gql`
  extend type Author {
    brazilian: Boolean!
  }
`;

const resolvers = {
  Author: {
    brazilian: () => true,
  },
};

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/',
  resolvers,
  typeDefs,
});

client
  .query({
    query: gql`
      {
        authors {
          id
          name
          brazilian @client
        }
      }
    `,
  })
  .then((result) => console.log({ result }));

// const NEW_AUTHOR_MUTATION = gql`
//   mutation CreateAuthor($newAuthor: NewAuthorInput) {
//     createAuthor(input: $newAuthor) {
//       id
//       name
//     }
//   }
// `;

// function createAuthor(name) {
//   client
//     .mutate({
//       mutation: NEW_AUTHOR_MUTATION,
//       variables: {
//         newAuthor: {
//           name,
//         },
//       },
//     })
//     .then((result) => console.log({ result }));
// }
// createAuthor('Stephen King');

export default client;
