const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/route');
const middleware = require('./middleware/auth');
const cors = require('cors');

app.use(cors({ origin: '*' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(middleware);

app.use('/api', routes)


function isTokenExpire(expireTime) {
  if (Math.floor(Date.now() / 1000) - expireTime < 0) {
    return false;
  }
  return true;
}


app.listen(8000, () => {
  console.log('Server is listening at 8000');
});