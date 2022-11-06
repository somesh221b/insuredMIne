const userDB=require('../model/user.model');
const agentDB=require('../model/agent.model');
const LOBDB=require('../model/LOB.model');
const policyCarrierDB=require('../model/policyCarrier.model');
const policyInfoDB=require('../model/policyInfo.model');
const userAccountDB=require('../model/userAccount.model');
const csv=require('csvtojson');
let multer=require('multer');
const path=require('path');


const uploadFile=async(req,res)=>{
    try{
        if(req.file){
            let CD=process. cwd();
            CD=CD.replace(/\\/g, "/");

            const csvFilePath=CD+'/file/'+req.file.filename;
            
            const jsonArray=await csv().fromFile(csvFilePath);
            // console.log(jsonArray);

            let agent=[],userAccount=[],pInfo=[];
            jsonArray.forEach(async(each)=>{
                const userInfo={
                    name:each.firstname,
                    email:each.email,
                    gender:each.gender,
                    DOB:each.dob,
                    phone:each.phone,
                    address:each.address,
                    zip:each.zip,
                    state:each.state,
                    userType:each.userType
                };
                let a=new userDB(userInfo);
                let users=await a.save();

                const agentInfo={
                    agent:each.agent
                };
                console.log(agentInfo);
                
                let aa=new agentDB(agentInfo);
                await aa.save();

                const userAccountInfo={
                    account_name:each.account_name
                };
                
                let ua=new userAccountDB(userAccountInfo);
                await ua.save();
                
                const lobinfo={
                    category_Name:each.category_name
                }
                
                let b=new LOBDB(lobinfo);
                let lobs=await b.save();

                const pCarrierInfo={
                    company_Name:each.company_name
                };
                let c=new policyCarrierDB(pCarrierInfo);
                let policyCarriers=await c.save();

                // let lobs=await LOBDB.insert(lob);
                // let policyCarriers=await policyCarrierDB.insert(pCarrier)
                let pinfo={
                    policyNumber:each.policy_number,
                    startDate:each.policy_start_date,
                    endDate:each.policy_end_date,
                    policyCategoryId:lobs._id,
                    companyCollectionId:policyCarriers._id,
                    userId:users._id,
                };
                let pi=new policyInfoDB(pCarrierInfo);
                await pi.save();

            });
            // console.log(pInfo);
            // let users=await userDB.insertMany(user);
            // let agents=await agentDB.insertMany(agent)
            // let lobs=await LOBDB.insertMany(lob)
            // let policyCarriers=await policyCarrierDB.insertMany(pCarrier)
            
            // let userAccounts=await userAccountDB.insertMany(userAccount)
            // for(let i=0;i<pInfo.length;i++){
            //     console.log('11111111',pInfo[i]);
            //     // pInfo[i][policyCategoryId]=lobs[i]._id;
            //     pInfo[i][companyCollectionId]=policyCarriers[i]._id;
            //     pInfo[i][userId]=users[i]._id;
            //     console.log(pInfo);
            // }
            
            // let policyInfos=await policyInfoDB.insertMany(pInfo);
            res.send('Data Insertec successfully')
        }else{
            res.send('bad')
        }
    }catch(e){
        console.log('error:-',e);
    }
}
const fileStorage = multer.diskStorage({
    destination: 'file',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});
const fileUpload = multer({
    storage: fileStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(csv)$/)) {
            return cb(new Error('please upload a file'));
        }
        cb(undefined, true);
    }
})
module.exports={uploadFile,fileUpload}