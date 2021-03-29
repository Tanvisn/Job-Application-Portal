const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const app = express();

app.use(cors()) ;

//Body parser middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

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
app.use('/api/recpro', require('./routes/api/recruiterprofile'));
app.use('/api/reccreatejob', require('./routes/api/rec_create_job'));
app.use('/api/recruiterdash', require('./routes/api/rec_all_jobs'));
app.use('/api/receditjob', require('./routes/api/rec_edit_job'));
app.use('/api/appsortjobs', require('./routes/api/app_sort_jobs'));
app.use('/api/appsearchjobs', require('./routes/api/app_search_jobs'));
app.use('/api/appfilterjobs', require('./routes/api/app_filter_jobs'));
app.use('/api/apply', require('./routes/api/all_applications'));

    const port = 5000;
    app.listen(port,() => console.log(`Server started on port ${port}`));