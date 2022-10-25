const express =require("express");
const mongoose=require("mongoose");

const app=express();

mongoose.connect("mongodb+srv://pranav:pranav123@cluster0.e9dl2.mongodb.net/News?retryWrites=true&w=majority", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

console.log("db connection successfull !");
const postSchema=new mongoose.Schema({

    Title:String,
    newsContent:String

})
const Posts= mongoose.model("Posts",postSchema);

app.get("/",(req,res)=>{

    const newpost=new Posts({
        Title:"Bank Blast at Dattchaowk",
        newsContent:"two Robbers done unsuccesfull attempy to blast the bank"
    });
    newpost.save();
    console.log("Done");
})

 app.listen(3000,()=>{
        console.log("running on port 3000");
 })