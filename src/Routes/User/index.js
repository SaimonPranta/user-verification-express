const express = require('express');
const router = express.Router();

router.use("/auth", require("./login"))
router.use("/auth", require("./singup"))

router.use("/user", require("./singleUser"))


module.exports = router;

