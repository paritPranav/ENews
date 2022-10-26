const mongoose = require("mongoose");

const postsSchema=new mongoose.Schema({

    Post_Title:{
        type:String,
        required:true
    },
    Post_Description:{
        type:String,
        required:true
    },
    Post_Place:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('Posts',postsSchema);