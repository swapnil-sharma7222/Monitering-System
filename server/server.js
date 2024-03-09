const express= require('express');
const connectdb=require("./db");
const app= express();
app.use(express.json());
connectdb();
require("dotenv").config();
app.use("/locality",require("./routes/userRoutes"));
app.use("/user",require("./routes/user2Routes"));
// app.get("/",(req,res)=>{
//     res.json({message : "get"});
// });
app.listen(5000, ()=> {
    console.log("servering on port 3000....");
})