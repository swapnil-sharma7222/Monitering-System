const express= require('express');
const connectdb=require("./db");
const app= express();
app.use(express.json());
connectdb();
require("dotenv").config();
app.use("/locality",require("./routes/userRoutes"));
app.use("/user",require("./routes/user2Routes"));
app.use("/user",require("./routes/otpRoutes"));

app.listen(5000, ()=> {
    console.log("serving on port 5000....");
})