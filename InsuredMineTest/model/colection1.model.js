const mongoose=require('mongoose');

const collection1Schema=new mongoose.Schema({
    date:{
        type: Date
    },
    message:{
        type:String
    }
});
module.exports=mongoose.model("collection1",collection1Schema);