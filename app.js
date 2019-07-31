const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator');
require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');


// app
const app = express();

// db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex:true
})
.then(() => console.log("DB Connected"));

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());


// routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);


app.get('/', (req,res) =>{
    res.send('hello from nodeJS');
});

const port = process.env.port || 8000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

