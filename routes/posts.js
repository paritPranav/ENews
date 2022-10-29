const bodyParser = require("body-parser");
const express = require("express");
const Post=require('../models/posts');
const jwt = require('jsonwebtoken');
const verify=require('./jwtverify');
const multer =require('multer');

const path = require('path');



const app=express();
let date= new Date();

//Strorage

const Storage =multer.diskStorage({

    destination:'uploads',
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const upload =multer({
    storage:Storage
}).single('testImage')

    
app.use(bodyParser.json());
const router = express.Router();


//Get all the posts Controller
router.get('/',async(req,res)=>{
    try{
        const posts=await Post.find();
        res.json(posts);
    }catch(err){
console.log(err);
res.send("Post Not Found");
    }
})

router.get('/makepost',(req,res)=>{
  
    res.sendFile(path.join(__dirname, '../post.html'));
    
})


//Get the specific post
router.get('/:postid',async(req,res)=>{
    
    try{
        const post= await Post.findById(req.params.postid);
        res.json(post);
    }catch(err){
        console.log(err);
    }
})



//Create Post controller
router.post('/createPost',verify,async(req,res)=>{
    console.log("Post method");
   
    console.log(req);
    upload(req,res,(err)=>{
        if(err){
            console.log("Here err")
            console.log(err);
        }else{

            const newPost = new Post({
                Post_Title:req.body.title,
                Post_Description:req.body.desc,
                Post_Place:req.body.place,
                Post_Image:{
                    data:req.file.filename,
                    contentType:'image/png'
                },
                Post_Date:date.getDate()
            })
        
                console.log("here i am going");
        }
          
    })
    


    try{
         const savedPost= await newPost.save();
         res.json(savedPost);
   }catch(err){
    res.send(err);
   }
});

//Delete Specific Post Router

router.delete('/:postid',verify,async(req,res)=>{
    try{

       const removePost= await Post.remove({_id:req.params.postid});
       res.send("POst deleted");

    }catch(err){
        console.log(err);
    }

})


//Update specific Post

router.patch('/:postid',verify,async(req,res)=>{

    try{
        
            const update=await Post.updateOne(
                {_id:req.params.postid},
                {
                    $set:{
                        Post_Title:req.body.title,
                        Post_Description:req.body.desc

                    }
                }
            );
            res.json(update);


    }catch(err){

    }

})





 module.exports = router;