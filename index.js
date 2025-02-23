const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const config = require('./config');
const routes = require('./routes')

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

mongoose.connect(config?.dbUri)
    .then(()=> {
        console.log("Connected to mongoDB")
    })
    .catch(err => {
        console.log(err)
    })

app.use('/api/user',routes.user);
app.use('/api/auth',routes.auth);

app.listen(config.port, ()=> {
    console.log(`Server is running on port: ${config.port}`)
})