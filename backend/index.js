const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
//const multer = require("multer");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
const studentRouter = require ("./routes/teacher");
app.use("/student", studentRouter);

app.get('/ping', (req, res) => {
    res.send('PONG');
});


/* Mongoose Setup */
const PORT = process.env.PORT || 8080; 
const URL = process.env.MONGODB_URL; 

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!");
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port number : ${PORT}`);
});