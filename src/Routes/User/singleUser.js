const express = require('express');
const { getSingleUser, deleteSingleUser } = require('../../Controlers/User/user');
const router = express.Router();


router.get("/:id", getSingleUser)
router.delete("/:id", deleteSingleUser)


module.exports = router;