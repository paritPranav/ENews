const bodyParser = require("body-parser");
const express = require("express");
const Post=require('../models/posts');

const app=express();



    
app.use(bodyParser.json());
const router = express.Router();

router.get('/',(req,res)=>{
    console.log(Post.find());
})


//Create Post Router
router.post('/createPost',(req,res)=>{
    console.log("Post method");
   
    console.log(req.body);
    const newPost = new Post({
        Post_Title:req.body.title,
        Post_Description:req.body.desc,
        Post_Place:req.body.place
    })
    newPost.save();
});

// router.get('/posts/specific',(req,res)=>{
//     res.send("We are on specific Post");
// })

 module.exports = router;