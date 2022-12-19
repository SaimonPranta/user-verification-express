const express = require('express');
const { login } = require('../../Controlers/User/user');
const router = express.Router();


router.post("/login", login)

module.exports = router;
