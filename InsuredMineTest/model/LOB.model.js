const mongoose=require('mongoose');

const lobSchema=new mongoose.Schema({
    category_Name:{
        type: String
    }
});
module.exports=mongoose.model("LOB",lobSchema);