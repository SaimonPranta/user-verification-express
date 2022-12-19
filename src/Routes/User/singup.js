const express = require('express');
const { signUp } = require('../../Controlers/User/user');
const router = express.Router();


router.post("/register", signUp)

module.exports = router;