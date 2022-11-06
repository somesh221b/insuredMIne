const mongoose=require('mongoose');

const userAccountSchema=new mongoose.Schema({
    account_name:{
        type: String
    }
});
module.exports=mongoose.model("userAccount",userAccountSchema);