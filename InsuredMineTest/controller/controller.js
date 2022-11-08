const userDB=require('../model/user.model');
const agentDB=require('../model/agent.model');
const LOBDB=require('../model/LOB.model');
const policyCarrierDB=require('../model/policyCarrier.model');
const policyInfoDB=require('../model/policyInfo.model');
const userAccountDB=require('../model/userAccount.model');
const collection1=require('../model/colection1.model');
const collection2=require('../model/collection2.model');

const csv=require('csvtojson');
let multer=require('multer');
const path=require('path');

const schedule = require('node-schedule');


const uploadFile=async(req,res)=>{
    try{
        if(req.file){
            let CD=process. cwd();
            CD=CD.replace(/\\/g, "/");

            const csvFilePath=CD+'/file/'+req.file.filename;
            
            const jsonArray=await csv().fromFile(csvFilePath);
            // console.log(jsonArray);

            let user=[],agent=[],userAccount=[],pInfo=[],lob=[],pCarrier=[];
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

                user.push(userInfo);
                const agentInfo={
                    agent:each.agent
                };
                console.log(agentInfo);
                agent.push(userInfo);

                const userAccountInfo={
                    account_name:each.account_name
                };
                userAccount.push(userAccountInfo)
                
                const lobinfo={
                    category_Name:each.category_name
                }
                lob.push(lobinfo);

                const pCarrierInfo={
                    company_Name:each.company_name
                };
                pCarrier.push(pCarrierInfo);
                policyCarrierDB.insert(pCarrier)
                let pinfo={
                    policyNumber:each.policy_number,
                    startDate:each.policy_start_date,
                    endDate:each.policy_end_date,
                    
                };
                pInfo.push(pinfo);
                

            });
            let users=await userDB.insertMany(user);
            let agents=await agentDB.insertMany(agent)
            let lobs=await LOBDB.insertMany(lob)
            let policyCarriers=await policyCarrierDB.insertMany(pCarrier)
            
            let userAccounts=await userAccountDB.insertMany(userAccount)
            for(let i=0;i<pInfo.length;i++){
                pInfo[i]['policyCategoryId']=lobs[i]._id;
                pInfo[i]['companyCollectionId']=policyCarriers[i]._id;
                pInfo[i]['userId']=users[i]._id;
                console.log(pInfo);
            }
            
            let policyInfos=await policyInfoDB.insertMany(pInfo);
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
});
const search=async(req,res)=>{
    try{
        console.log(req.query.name);
        let data=await policyInfoDB.find().populate({path:'userId',select:'name'});
        let list=[]
        data.forEach((each)=>{
            if(each.userId.name.toLowerCase()==req.query.name.toLowerCase()){
                list.push(each);
            }
        })
        res.send(list)
    }catch(e){
        console.log('error:-',e);
    }
}
const scheduler=async(req,res)=>{
    try{
        const date=new Date(req.query.date)

        let data=new collection1({
            date,
            message:req.query.message
        });
        const datum=await data.save();

        const job = schedule.scheduleJob(date, async()=>{
            let data=new collection2({
                message:datum.message
            });
            await data.save();
            await collection1.remove({_id:datum._id})
        });
        res.send("Data will be send on Time")
    }catch(e){
        console.log(e);
    }
}
module.exports={uploadFile,fileUpload,search,scheduler}