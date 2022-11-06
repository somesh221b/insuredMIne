const express= require('express');

const mongoose= require('mongoose');

const multer= require('multer');

const bodyParser=require('body-parser');

const upload= multer();

const app=express();

app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));

const url='mongodb+srv://InsuredMine:Mine123@insured.skbwnd6.mongodb.net/insuredMine';

mongoose.connect(url, {useNewUrlParser: true});

const con=mongoose.connection;
const router=require('./routers/router');
app.use('/',router);
con.on('open',()=>{
    console.log('DB Connected...');
});

app.listen(8000,()=>{
    console.log('server listing....');
})
