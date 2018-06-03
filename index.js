const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const user = require('./models/User');
const passportConfig = require('./services/passport');


mongoose.connect('mongodb://localhost/facebookOauth');

const app = express();

authRoutes(app);

app.listen(5000);