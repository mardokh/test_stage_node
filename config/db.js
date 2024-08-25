const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://devchakib45:mazda45@cluster0.2x1s4.mongodb.net/mytestdb');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});