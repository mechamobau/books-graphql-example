const nano = require('nanoid');

/**
 * 
 * @param {import('lowdb').LowdbSync<any>} db 
 * @param {*} table 
 * @returns 
 */
const createModel = (db, table) => ({
  findOne(filter = {}) {
    return db.get(table)
      .find(filter)
      .value();
  },
  findMany(filter = {}) {
    return db.get(table)
      .filter(filter)
      .orderBy(['createdAt'], ['desc'])
      .value();
  },
  updateOne(filter, update) {
    const match = this.findOne(filter);

    db.get(table)
      .find(filter)
      .assign(update)
      .write();

    return this.findOne({ id: match.id });
  },
  remove(filter) {
    return db.get(table)
      .remove(filter)
      .write();
  },
  createOne(fields) {
    const item = { ...fields, createdAt: Date.now(), id: nano.nanoid() };

    db.get(table)
      .push(item)
      .write();

    return this.findOne({ id: item.id });
  },
  createMany(toCreate) {
    const manyToCreate = (Array.isArray(toCreate) ? toCreate : [toCreate])
      .map(item => ({ ...item, createdAt: Date.now(), id: nano.nanoid() }));
    
    db.get(table)
      .push(...manyToCreate)
      .write();
  }
});

module.exports = createModel;
