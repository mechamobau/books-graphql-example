const typeDefs = `#graphql
    type Author {
        id: ID!
        name: String!
    }

    type Book {
        id: ID!
        title: String
        author: Author
    }
    
    type Mutation {
        # createBook(input: NewBookInput): Book
    }
`

module.exports = typeDefs
