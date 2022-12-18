const root = async (req, res) => {
    try {
        res.send("Great, We Are online yet!")
    } catch (error) {
        console.log(error)
    }
};

module.exports = root;