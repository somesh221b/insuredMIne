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
        type: mongoose.Types.ObjectId,
        ref: 'LOB'
    },
    companyCollectionId:{
        type: mongoose.Types.ObjectId,
        ref: 'policyInfo'
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
});
module.exports=mongoose.model("policyInfo",policyInfoSchema);