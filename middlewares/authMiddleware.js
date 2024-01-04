const JWT = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config

// Protected Routes Token based

exports.requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token)
            return res.status(403).send({ auth: false, message: 'User SignIn Required.' });

        JWT.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err)
                return res.status(500).send({ success: false, message: 'User SignIn Required' });
            // setting userId in the req object
            req.body.userId = decoded._id;
            next();
        })

    }
    catch (error) {
        console.log(error);
    }
}