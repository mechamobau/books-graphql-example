const { models } = require('./db');

function findAuthor(parent, args, contextValue, info) {
  return models.Author.findOne({ id: parent ? parent.author : args.id });
}

const resolvers = {
  Query: {
    books: () => models.Book.findMany(),
    authors: () => {
      return models.Author.findMany();
    },
    book: (parent, args, contextValue, info) =>
      models.Book.findOne({ id: args.id }),
    author: findAuthor,
  },
  Mutation: {
    createBook: (_, args) => {
      return models.Book.createOne(args.input);
    },
    createAuthor: (_, args) => {
      return models.Author.createOne(args.input);
    },
    deleteAuthor: (_, args) => {
      models.Author.remove(args.id);
      return { message: true };
    },
  },
  Book: {
    author: findAuthor,
  },
};

module.exports = {
  resolvers,
};
