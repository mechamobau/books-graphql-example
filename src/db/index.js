const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const createModel = require('./models')

const adapter = new FileSync('src/db/db.json')
const db = low(adapter)

db.defaults({ books: [], authors: [] }).write()

module.exports = {
  models: {
    Book: createModel(db, 'books'),
    Author: createModel(db, 'authors'),
  },
  db
}