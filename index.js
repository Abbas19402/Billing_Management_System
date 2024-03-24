const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const routes = require('./routes')

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

mongoose.connect("mongodb+srv://abbasdalal19402:E4q4VSiNIYwrhlp6@cluster0.w96ligs.mongodb.net/billing_management")
    .then(()=> {
        console.log("Connected to mongoDB")
    })
    .catch(err => {
        console.log(err)
    })

app.use('/api/user',routes.user);
app.use('/api/auth',routes.auth);

app.listen(config.port, ()=> {
    console.log(`Server is running on pert: ${config.port}`)
})