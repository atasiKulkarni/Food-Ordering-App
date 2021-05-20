const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require ("mongoose");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const CategoryRouter = require('./routes/category');
const MenuRouter = require('./routes/menu');
const app = express();

mongoose.connect('mongodb+srv://atasi:6395@cluster0.lt1jt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},
function(err)
{
    if(err)
    {
        console.log("Error",err);
    }
    else
    {
        console.log("Connection to database is successfull");
    }
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', CategoryRouter);
app.use('/menu', MenuRouter);

module.exports = app;
