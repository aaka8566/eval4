const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth=async(req,res,next)=>{
const token=req.headers.authorization;
if(token){
   const decoded= jwt.verify(token.split(" ")[1], 'masai');
   if(decoded){
    console.log(decoded);
    req.body.name=decoded.name;
    req.body.userid=decoded.userid;
    console.log(req.body);
next();
   }
   else{
    res.status(400).send(err.message)
   }
}
else{
    res.status(200).send("Please Login");
}
};
module.exports={auth};