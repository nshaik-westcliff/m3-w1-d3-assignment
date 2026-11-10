/* const app = require('./app');

const server = app.listen(3000, () => {
  console.log(`Express is running on ${server.address().port}`);
}); */

require('dotenv').config();
require('./models/Registration');

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE);

mongoose.connection
  .on('open', () => {
    console.log('Database connection open');
  })
  .on('error', (err) => {
    console.error(`Database connection error: ${err.message}`);
  });

  const app = require('./app');

  const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
  });