const userModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('../helper/authHelper')
const dotenv = require('dotenv')
const JWT = require('jsonwebtoken');

dotenv.config()

exports.signupController = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        // validation

        if (!name)
            return res.send({ error: 'Name is Required' });
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }

        // checking the user in db if it already exists or not
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            res.status(400)
            return res.send({
                success: false,
                message: 'Email already exists'
            })
        }

        // Registering the User

        // hashing the plain password
        const hashedPassword = await hashPassword(password, 10);

        // save user into database
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        });



        res.status(201);
        res.send({
            success: true,
            message: "User Registered Successfully",
            user
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error  in Registeration",
            error,
        });
    }

}

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            res.status(400)
            return res.send({
                success: false,
                message: "Invalid email or password",
            })
        }

        // checking user into Database
        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(404)
            return res.send({
                success: false,
                message: "Email is not registerd",
            });
        }

        // comparing plain password entered by user and hashedPassword stored in DB
        const Match = await comparePassword(password, user.password);

        if (!Match) {
            res.status(400)
            res.send({ success: false, message: "Invalid Token" })
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.status(200)
        res.send({
            success: true,
            message: "LoggedIn Successfully",
            user: {
                _id: user.Id,
                name: user.name,
                email: user.email,
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
}