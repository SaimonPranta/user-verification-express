const express = require('express');
const { getSingleUser, deleteSingleUser, updateSingleUser} = require('../../Controlers/User/user');
const router = express.Router();


router.get("/:id", getSingleUser)
router.put("/:id", updateSingleUser)
router.delete("/:id", deleteSingleUser)


module.exports = router;