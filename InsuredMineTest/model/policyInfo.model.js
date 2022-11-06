const mongoose=require('mongoose');

const policyInfoSchema=new mongoose.Schema({
    policyNumber:{
        type: String
    },
    startDate:{
        type: Date
    },
    endDate:{
        type: Date
    },
    policyCategoryId:{
        type: String,
        // ref: 'LOB'
    },
    companyCollectionId:{
        type: String,
        // ref: 'policyInfo'
    },
    userId:{
        type: String,
        // ref: 'user'
    },
});
module.exports=mongoose.model("policyInfo",policyInfoSchema);