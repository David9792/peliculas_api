const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const path = require('path');

const { mongoose } = require('./database');

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//routes
app.use('/api/movies/', require('./routes/movie.routes'));

//static files
app.use(express.static(path.join(__dirname, 'public')))

//starting server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
});