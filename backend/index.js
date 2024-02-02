const express = require('express');
const mongoose= require('mongoose');
const fs = require('fs');
const cors= require('cors');
const { DataModel } = require('./db');
const app= express();
app.use(cors());
app.use(express.json());

require('dotenv').config();
mongoose.connect(process.env.mongoUrl);

const fileData= fs.readFileSync('./jsondata.json');
const data= JSON.parse(fileData);

data.forEach(async (element) => {
    try{
        const newData= new DataModel(element);
        await newData.save();

    }
    catch(e){
        console.log(e);
    }
});

app.get('/', async (req,res)=>{
    const data= await DataModel.find({});
    res.json({
        data,
    })
})


app.listen(4000, () => {
    console.log(`Server started on 4000`);
});