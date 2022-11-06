const mongoose=require('mongoose');

const policyCarrierSchema=new mongoose.Schema({
    company_Name:{
        type: String
    }
});
module.exports=mongoose.model("policyCarrier",policyCarrierSchema);