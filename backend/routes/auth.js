const express = require('express');
const router = express.Router();
const UserSchema = require('../models/User');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = "imvishal"
const { fetchusers } = require("../middleware/fetchuser")

router.post('/createuser', [
    body('name', "Name value should have atleast 5 length").isLength({ min: 5 }),
    body('email', "Enter a valid email id").isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {

    //to check common validation 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success : false });
    }

    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
        return res.status(400).json({ error: `${req.body.email} is already registered please enter a new email id`, success : false })
    }

    const salt = await bcrypt.genSalt(10);
    const securedPass = await bcrypt.hash(req.body.password, salt)

    //req to db to create a new user
    var userinfo = await UserSchema.create({
        "name": req.body.name,
        "email": req.body.email,
        "password": securedPass
    })
    //JWT 

    const userData = {
        userinfo : {
            id : userinfo._id
        } 
    }

    const AuthToken = jwt.sign(userData, secretKey)
    res.json({ AuthToken, success : true })

})


//login end point
router.post('/loginuser', [
    body('email', "Enter a valid email id").isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {

    //to check common validation 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success : false });
    }

    try {
        var userExist = await User.findOne({ email: req.body.email });

        if (!userExist) {
            return res.status(400).json({ error: `No user exist with ${req.body.email}`, success : false })
        }

        const passVerification = await bcrypt.compare(req.body.password, userExist.password)

        if (!passVerification) {
            return res.status(400).json({ error: `Please enter valid credentials`, success : false })
        }

        const userData = {
            userinfo : {
                id : userExist._id
            } 
        }
    
        const AuthToken = jwt.sign(userData, secretKey)
        res.json({ AuthToken, success : true })
    

    } catch (error) {
        res.send(" Unkown error occured  !!!" + error)
    }

    

})

//getuser endpoint
router.post('/getuser', fetchusers, async (req, res) => {

    try {
        const userData = await User.findById(req.user)
        console.log("this is endpoint")
        console.log(userData)

        res.send(userData)
    } catch (error) {
        res.status(500).send("Internal Server Issue " + error)

    }


}

)

module.exports = router