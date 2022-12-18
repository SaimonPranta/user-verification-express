const mongoose= require("mongoose")
const dotenv = require("dotenv");
dotenv.config()


mongoose.connect(process.env.MONGODB_URI)
.then(sucess=> {
    console.log("sucessfully connected to database")
})
