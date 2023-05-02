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

const connectDB = async () => {
    try {
       await connection;
   
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
// app.listen(process.env.PORT,async()=>{
//     try{
//         await connection;
//         console.log("server is up")
//     }
//     catch(er){
//         console.log(err);
//     }
// })
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("listening for requests");
    })
})