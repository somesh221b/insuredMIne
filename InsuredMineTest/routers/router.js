const express=require('express');
const router=express.Router();

const {uploadFile,fileUpload,search,scheduler}=require('../controller/controller');

router.post('/file-upload',fileUpload.single('file'),uploadFile);
router.get('/search',search);
router.post('/scheduler',scheduler);


module.exports=router