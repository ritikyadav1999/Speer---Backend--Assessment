const express = require('express');
const { signupController, loginController } = require('../controllers/authController');
const { requireSignIn } = require('../middlewares/authMiddleware');
const router = express.Router();



//routing
//REGISTER || METHOD POST
router.post('/signup', signupController);


//LOGIN || POST
router.post("/login", loginController);



// testing Protected Routes
router.get("/test", requireSignIn, (req, res) => {
    try {
        res.status(200).send({ ok: true, _id: req.body.userId });
    }
    catch (error) {
        res.status(400).send({ ok: false })
    }
});



module.exports = router;