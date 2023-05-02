const express=require('express');
const app = express();
const {connection}=require("./db");
const cors=require("cors");
const {usersRouter}=require("./routes/users.routes");
const {postsRouter}=require("./routes/posts.routes");
const {auth}=require("./middleware/auth");
app.use(cors());
app.use(express.json());


require("dotenv").config();

app.use("/users",usersRouter);
app.use(auth);
app.use("/posts",postsRouter);


app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("server is up")
    }
    catch(er){
        console.log(err);
    }
})