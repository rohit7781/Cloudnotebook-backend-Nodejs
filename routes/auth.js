const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


// Creating my own secret key for verification 
JWT_SECRET = "my$&*@$Rohit&&"


//Route 1 : Create a user using = POTS : /api/auth/createuser . No login required
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
        res.status(500).send("Internal server error occurs")
    }
} )



//Route 2 : Authenticate a user using = POTS : /api/auth/login No login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Enter your password please').exists(),
],async (req, res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            success = false;
            return res.status(400).json({
                error: "Sorry user doesn't exits"
            });
        }

        const passwordcompare = await bcrypt.compare(password,user.password)
        if (!passwordcompare) {
            success = false;
            return res.status(400).json({error:"Enter correct password"});
        }

        const data = {
            user :{
                id : user.id
            }
        }
        success = true;
        const authtoken = jwt.sign(data,JWT_SECRET)
        res.json(authtoken);
    

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occurs")
    }
    
} )
//Route 3 : Get user login data = POTS : /api/auth/getuer .login required
router.post('/getuser',fetchuser,async (req, res)=>{

try {
    userId = req.user.id;   
    const user = await User.findById(userId).select("-password")
    res.send(user);

} catch (error) {
    console.error(error.message);
        res.status(500).send("Internal server error occurs")
}

})


module.exports = router