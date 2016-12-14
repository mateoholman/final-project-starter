// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// Require our custom strategies
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/final-project-app')
  .then(() => console.log('[mongoose] Connected to MongoDB'))
  .catch(() => console.log('[mongoose] Error connecting to MongoDB'));

const app = express();

//Setup our routes
const authenticationRoutes = require('./routes/authentication');
const authStrategy = passport.authenticate('authStrategy', { session: false });
const listRoutes = require('./routes/list');
const itemRoutes = require('./routes/item');

app.use(bodyParser.json());
app.use('/api', authenticationRoutes);
app.use('/api/lists', authStrategy, listRoutes);
app.use('/api/items', authStrategy, itemRoutes);

app.get('/api/secret', authStrategy, function(req, res, next) {
  res.send(`The current user is ${req.user.username}`);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
