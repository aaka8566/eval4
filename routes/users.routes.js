const express=require("express");
const usersRouter=express.Router();
const {usersModel}=require("../models/users.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

usersRouter.post("/register",async(req, res)=>{
 try{
    const {password}=req.body;
    bcrypt.hash(password, 5, async function(err, hash) {
        // Store hash in your password DB.
        if(err){res.status(400).send(err);}
        req.body.password=hash;
        const user=await usersModel(req.body);
await user.save();
res.send("new user added successfully");
return;
    });
 }
 catch(err){res.send(err)}

});
usersRouter.post("/login",async(req,res)=>{
try{
const {email,password}=req.body;
const user=await usersModel.findOne({email});
if(user){
    bcrypt.compare(password, user.password, function(err, result) {
        // result == true
        if(result){
const token = jwt.sign({ "name": user.name,"userid":user.id }, 'masai');
res.status(200).send({"token":token})
        }
        else{
res.send("Wrong Credentials");
        }
    });
}
else{
    res.send("No user exists");
}
}
catch(err){res.send(err);}
});



module.exports={usersRouter};