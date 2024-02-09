const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const middleware = require('./middleware/auth');
const cors = require('cors');
const db = require('./config/database');
const { PORT, MONGODB_URI } = require('./constant');
app.use(cors({ origin: '*' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// configuring database
db(MONGODB_URI)
  .then(result => {
    if (!result) {
      process.exit(1);
    }
    console.log('Db connected successfully');
  })
  .catch(err => {
    console.error(err);
  });


// configuring middleware
app.use(middleware);


// configuring routes
app.use('/api', routes)


function isTokenExpire(expireTime) {
  if (Math.floor(Date.now() / 1000) - expireTime < 0) {
    return false;
  }
  return true;
}


app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});