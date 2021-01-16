const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const app = express();

app.use(cors()) ;

//Body parser middleware
app.use(express.json());

//DB config
const db = config.get('mongoURI');

//Connect to mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))
//Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/appro', require('./routes/api/applicantprofile'));

    const port = 5000;
    app.listen(port,() => console.log(`Server started on port ${port}`));