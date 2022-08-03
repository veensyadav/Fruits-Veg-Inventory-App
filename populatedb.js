#! /usr/bin/env node

console.log(
  'This script populates some test items and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

var async = require('async');
const Item = require('./models/item');
const Category = require('./models/category');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const items = [];
const categories = [];

/**
 * Creates a new item
 */
const itemCreate = (name, description, price, category, numberInStock, cb) => {
  const item = new Item({ name, description, price, category, numberInStock });

  item.save((err) => {
    if (err) {
      cb(err, null);
    } else {
      console.log('New item:', item);
      items.push(item);
      cb(null, item);
    }
  });
};

/**
 * Creates a new category
 */
const categoryCreate = (name, description, cb) => {
  const category = new Category({ name, description });

  category.save((err) => {
    if (err) {
      cb(err, null);
    } else {
      console.log('New category:', category);
      categories.push(category);
      cb(null, category);
    }
  });
};

/**
 * Creates list of categories
 */
const createCategories = (cb) => {
  async.series(
    [
      (callback) => {
        categoryCreate('Fruits', 'Has all fruits you need!', callback);
      },
      (callback) => {
        categoryCreate('Vegetables', 'Has all vegetables you need!', callback);
      },
    ],
    cb
  );
};

/**
 * Creates a list of items
 */
// const createItems = (cb) => {
//   async.series(
//     [
//       (callback) => {
//         itemCreate('Green Apple', 'Tasty and Fresh!', 0.5, categories[0], 6, callback);
//       },
//       (callback) => {
//         itemCreate('Red Apple', 'Fresh red apples!', 0.4, categories[0], 4, callback);
//       },
//       (callback) => {
//         itemCreate('Watermelon', "Great when it's hot!", 0.1, categories[0], 32, callback);
//       },
//       (callback) => {
//         itemCreate('Orange', 'Juicy and refreshing!', 0.5, categories[0], 8, callback);
//       },
//       (callback) => {
//         itemCreate('Tomato', 'Great imported tomatoes', 0.25, categories[1], 10, callback);
//       },
//       (callback) => {
//         itemCreate('Cucumber', 'Boring green cucumbers', 0.15, categories[1], 4, callback);
//       },
//       (callback) => {
//         itemCreate('Potato', 'potatoes!', 0.15, categories[1], 18, callback);
//       },
//     ],
//     cb
//   );
// };

async.series([createCategories, createItems], (err, results) => {
  if (err) {
    console.log('ERROR:', err);
  } else {
    console.log('Results:', results);
  }

  // Disconnect from database
  mongoose.connection.close();
});
