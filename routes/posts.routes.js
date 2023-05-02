const express=require("express");
const postsRouter=express.Router();
const {postsModel}=require("../models/posts.model");

postsRouter.get("/",async(req, res)=>{
    console.log(req.body)
const posts=await postsModel.find({"userid":req.body.userid});
    res.send(posts);
});

postsRouter.post("/create",async(req, res)=>{
console.log(req.body,"created")
    const post=await new postsModel(req.body);
       await post.save();
    res.send("new post added");
    });
    postsRouter.patch("/update/:id",async(req, res)=>{
        const {id}=req.params;
        const post=await postsModel.findById({"_id":id});
        try{
            if(req.body.userid==post.userid){
                await postsModel.findByIdAndUpdate({"_id":id},req.body);
            
                res.send("post updated");
            }
            else{
                res.status(200).send("not authorized");
            }
        }
            catch(err){res.status(400).send(err)}
            });
            postsRouter.delete("/delete/:id",async(req, res)=>{
                const {id}=req.params;
                const post=await postsModel.findById({"_id":id});
                try{
                    if(req.body.userid==post.userid){
                        await postsModel.findByIdAndDelete({"_id":id});
                        res.send("post deleted successfully");
                    }
                    else{
                        res.status(200).send("not authorized");
                    }
                }
                catch(err){res.status(400).send(err)}
        
              
                    });

module.exports={postsRouter};