const bodyParser = require("body-parser");
const express = require("express");
const User=require('../models/users');
const md5=require('md5');




const app=express();
 

app.use(bodyParser.json());
const router = express.Router();


//get all users

router.get('/',async(req,res)=>{

    try{
        const users=await User.find();
        res.json(users);
    }catch(err){
        res.send(err);
    }
})




//New registreation ;
router.post('/register',async(req,res)=>{

    console.log("registreation..........");
    console.log(req.body);
    const idExist=await User.findOne({User_Id:req.body.id});
    if(idExist)return res.status(400).send("is already exist")

    const newuser= new User({
        User_Id:req.body.id,
        Password:md5(req.body.pass)
    });

   try{
    const newRegister= await newuser.save();
    res.json(newRegister);
   }catch(err){
        res.send(err);
   }


});


//login 
router.post('/login', async(req,res)=>{

    console.log(req.body);

    const idExist=await User.findOne({User_Id:req.body.id, Password:md5(req.body.pass)});
    if(!idExist)return res.status(400).send("Check password or UserId correctly");

    res.send("loged in");
    res.header(req.body.id)

})



module.exports=router;