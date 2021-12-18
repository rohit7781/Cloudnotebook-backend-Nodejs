var jwt = require('jsonwebtoken');
JWT_SECRET = "my$&*@$Rohit&&"

const fetchuser = (req,res,next)=>{
    // get the user from jwt token and id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error:"Use valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user ;
        next();
        
    } catch (error) {
        res.status(401).send({error:"Use valid token"});
    }
}



module.exports = fetchuser ;