const express=require('express');
const router=express.Router();

const {uploadFile,fileUpload}=require('../controller/controller');

router.post('/file-upload',fileUpload.single('file'),uploadFile);

module.exports=router