const mongoose = require('mongoose');


const connectDb = async (uri) => {
  try {
    const db = await mongoose.connect(uri);
    if (db) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

// console.log(connectDb('mongodb://localhost:27017/local_test'));
module.exports = connectDb;