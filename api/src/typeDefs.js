const typeDefs = `#graphql
    input NewBookInput {
        title: String!
        author: String!
    }

    input NewAuthorInput {
        name: String!
    }

    type SuccessResponse {
        message: Boolean
    }

    type Author {
        id: ID!
        name: String!
    }

    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        id: ID!
        title: String
        author: Author
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        books: [Book]
        book(id: ID!): Book
        authors: [Author]
        author(id: ID!): Author
    }
    
    type Mutation {
        createBook(input: NewBookInput): Book
        createAuthor(input: NewAuthorInput): Author
        deleteAuthor(authorID: String): SuccessResponse
    }
`

module.exports = typeDefs
