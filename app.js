const express =require("express");
const mongoose=require("mongoose");
require('dotenv/config');

const app=express();

mongoose.connect(process.env.DB_Connect, {
   useNewUrlParser: true,
   useUnifiedTopology: true
},()=>{
    console.log("DB_Connection Successfull");
});
//import routes
const PostRoute=require("./routes/posts");


//const Posts= mongoose.model("Posts",postSchema);

app.use("/posts",PostRoute);


app.get("/",(req,res)=>{

    // const newpost=new Posts({
    //     Title:"Bank Blast at Dattchaowk",
    //     newsContent:"two Robbers done unsuccesfull attempy to blast the bank"
    // });
    // newpost.save();
    res.send("Home")
    console.log("Done");
})

 app.listen(3004,()=>{
        console.log("running on port 3000");
 })