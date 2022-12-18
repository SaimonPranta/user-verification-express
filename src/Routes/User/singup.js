const express = require('express');
const { signUp } = require('../../Controlers/User/user');
const router = express.Router();
// const userController = require('../../Controlers/User/');


router.post("/signup", signUp)

module.exports = router;