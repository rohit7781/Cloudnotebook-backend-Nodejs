const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

// Creating my own secret key for verification
JWT_SECRET = "my$&*@$Rohit&&"


// Create a user using = POTS : /api/auth/createuser
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be more than 5  character').isLength({ min: 5 }),

],async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        
    
    let user = await User.findOne({email:req.body.email});
    if (user) {
        return res.status(400).json({error:"Email already registered"})
    }

    const salt = await bcrypt.genSalt(10)
    secPass = await bcrypt.hash(req.body.password,salt) ;

    // Creating a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
    const data = {
        user :{
            id : user.id
        }
    }
      
    const authtoken = jwt.sign(data,JWT_SECRET)


    res.json(authtoken);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occurs")
    }
} )

module.exports = router