const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    gender:{
        type: String,
    },
    DOB:{
        type: String,
    },
    phone:{
        type: String
    },
    address:{
        type: String
    },
    zip:{
        type: String
    },
    state:{
        type: String
    },
    userType:{
        type: String
    }
});
module.exports=mongoose.model("user",userSchema);   