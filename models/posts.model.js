const mongoose=require("mongoose");
const postsSchema=mongoose.Schema({
    "title":String,
    "body":String,
    "device":String,
    "name":String,
    "userid":String
    
});

const postsModel=mongoose.model("posts",postsSchema);
module.exports={postsModel};