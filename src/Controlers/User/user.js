const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user_collection = require('../../DB/Modals/userModal')
exports.login = async (req, res) => {
    try {
        const { email, password } = await req.body

        if (email && password) {
            const userArry = await user_collection.find({ email: email.toString() });

            if (userArry.length > 0) {
                bcrypt.compare(password, userArry[0].password, async (err, result) => {
                    if (result) {
                        const token = await jwt.sign(
                            {
                                email: userArry[0].email,
                                id: userArry[0]._id
                            },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: "3d" }
                        );
                        userArry[0].password = null
                        res.status(200).json({
                            data: userArry[0],
                            token: token,
                            sucess: "You are sucessfully login"
                        })
                    } else {
                        res.status(401).json({ failed: "user/password are invalid, please try again." })
                    }
                })

            } else {
                res.status(401).json({ failed: "user/password are invalid, please try again." })
            }
        } else {
            res.status(401).json({ failed: "user/password are invalid, please try again." })
        }

    } catch (err) {
        res.status(404).send({ failed: "Some thing is wrong, please try again." })
    }
}
exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, role, userName, password } = await req.body

        if (firstName && lastName && phoneNumber && email && role && userName && password) {
            const hashingPassword = await bcrypt.hash(password, 10)
            const userInfo = await {
                firstName,
                lastName,
                phoneNumber,
                email,
                role,
                userName,
                password: hashingPassword
            }


            const documents = await new user_collection(userInfo)
            const createdUser = await documents.save()
            if (createdUser.phoneNumber) {
                const token = await jwt.sign(
                    {
                        phoneNumber: createdUser.phoneNumber,
                        id: createdUser._id
                    },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "1d" }
                );
                createdUser.password = null

                res.status(201).json({
                    data: createdUser,
                    sucess: "sucessfully created your accout",
                    token: token
                })
            } else {
                res.status(404).send({ failed: "failed to Create your account, please tryout latter" })
            }
        } else {
            res.status(500).send({ failed: "your porvided Reference number & Phone Nmuber must be number" })
        }

    } catch (err) {
        console.log(err)
        res.status(404).send({ failed: "failed to Create your account, please tryout latter" })
    }
}

exports.getSingleUser = async (req, res) => {
    try {
        const { id } = await req.params;
        const user = await user_collection.findOne({ _id: id })
        res.json({ data: user })

    } catch (error) {
        // console.log("error from error section !", error)
        res.json({ failed: "User not found" })
    }
}

exports.updateSingleUser = async (req, res) => {
    try {
        const { id } = await req.params;
        const { firstName, lastName, phoneNumber, role } = req.body

        if (firstName && lastName && phoneNumber && role) {
            const userInfo = await {
                firstName,
                lastName,
                phoneNumber,
                role,
            }

            const updateUser = await user_collection.findOneAndUpdate({ _id: _id },
                {
                    $set: {
                        ...userInfo
                    }
                },
                {
                    new: true
                })
            res.json({ data: updateUser })
        } else {
            res.json({ failed: "Something is wrong" })
        }

    } catch (error) {
        // console.log("error from error section !", error)
        res.json({ failed: "User not found" })
    }
}
exports.deleteSingleUser = async (req, res) => {
    try {
        const { id } = await req.params;
        const user = await user_collection.deleteOne({ _id: id })
        res.json({ data: user })

    } catch (error) {
        // console.log("error from error section !", error)
        res.json({ failed: "User not found" })
    }
}

