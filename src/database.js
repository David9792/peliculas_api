const mongoose = require('mongoose');

const uri = 'mongodb://localhost/movies_api';
mongoose.connect(uri, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('db connected'))
    .catch(err => console.error(err));

module.exports = mongoose;