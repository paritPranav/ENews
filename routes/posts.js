const bodyParser = require("body-parser");
const express = require("express");
const Post=require('../models/posts');
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("We are on all Posts");
})

router.post('/',(req,res)=>{

    console.log(req.body);
});
// router.get('/posts/specific',(req,res)=>{
//     res.send("We are on specific Post");
// })

 module.exports = router;