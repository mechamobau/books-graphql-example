import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/',
});

// client
//   .query({
//     query: gql`
//       {
//         authors {
//           id
//           name
//         }
//       }
//     `,
//   })
//   .then((result) => console.log({ result }));

export default client;
