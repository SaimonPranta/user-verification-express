const user_collection = require("../../DB/Modals/userModal");

const root = async (req, res) => {
    try {
        // const user = await user_collection.find()
        // res.json({data: user})
        res.send("Great, We Are online yet!")
    } catch (error) {
        console.log(error)
    }
};

module.exports = root;