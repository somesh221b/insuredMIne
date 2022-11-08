const mongoose=require('mongoose');

const collection2Schema=new mongoose.Schema({
    message:{
        type: String
    }
});
module.exports=mongoose.model("collection2Schema",collection2Schema);