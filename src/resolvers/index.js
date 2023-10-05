const books = require("./books");

const resolvers = {
    Query: {
        books: () => books,
    }
}

module.exports = {
    resolvers
};
