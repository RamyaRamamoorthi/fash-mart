const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const productRoutes = require("./routes/product");
//const userRoutes  = require('./routes/user');
const cartRoutes = require('./routes/cart');
const app = express();

mongoose.connect('mongodb://localhost:27017/virtualstandups',
{useNewUrlParser: true})

const db = mongoose.connection
db.on('error', 
console.error.bind(console, 'connection error:'))

db.once('open',function() {
    console.log('connected to MongoDB')

  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/images",express.static(path.join("backend/images")));


app.use("/api",productRoutes);
//app.use("/api/user",userRoutes);
app.use("/api/cart",cartRoutes);
module.exports = app;