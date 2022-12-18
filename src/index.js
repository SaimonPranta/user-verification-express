const express = require('express');
const cors = require('cors');
require("./DB/connection");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const root = require('./Routes/Root/root');


const app = express();
dotenv.config()

const port = process.env.PORT || 8000


// ====== Middleware ======
app.use(cors())
app.use(express.json())
// app.use(express.static(path.join(__dirname, "images/slider_img")))



// ====== Root Route ======
app.get('/', root);



// ====== Slider Provider Route ======
app.use('/', require('./Routes/User/index'))


// ====== Error Handling Middleware ======
app.use((error, req, res, next) => {
    if (error.message) {
        res.status(500).send({ error: error.message })
    } else if (error) {
        console.log(error)
        res.status(500).send({ error: "Something is wrong, please try out letter" })
    }
});

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})

    

