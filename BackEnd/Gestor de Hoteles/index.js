'use strict'

const express = require("express")
const app = express();
const { connection } = require("./src/database/connection");
require('dotenv').config();
const port = process.env.PORT;
const user = require('./src/routes/user.routes');
const hotel = require('./src/routes/hotel.routes');
const servicios = require('./src/routes/servicios.routes');
const bedroom = require('./src/routes/bedrooms.routes');
const event = require('./src/routes/events.routes');
const reservation = require('./src/routes/reservation.routes');
const { adminApp } = require("./AdminAPP.controller");

connection();

app.use(express.urlencoded({extended: false}));

app.use('/api', user,
                hotel,
                servicios,
                bedroom,
                event,
                reservation);

app.listen(port, () =>{
    console.log(`El servidor está corriendo en el puerto ${port}`);
});

adminApp();