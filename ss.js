const express = require('express');

const m = require('mongoose');

const a = express();

a.use(express.json())
a.use(express.urlencoded({extended : true}))

m.connect('mongodb://127.0.0.1:27017/sont').then(()=>{
    console.log("conected...");
}).catch((err)=>{
 console.log(err);
})

const es = new m.Schema({
    name:{
        type:String,
        require:true
    },
    sal:{
        type:Number,
        require:true
    },
})

const mm = m.model('eor',es)

a.get('/',(req,res)=>{
    res.send("hello")
})

a.post('/a',async(req,res)=>{
    try {
        let data = new mm (req.body)
        let re = await data.save()
        res.json(re)
    } catch (error) {
        console.log(error);
    }
})

a.put('/u/:id',async(req,res)=>{
    try {
        let id = req.params.id
        let re = await mm.findByIdAndUpdate(id,req.body)
        if (re) {
            res.send("done");

        } else {
            console.log("sniff sniff ...");
        }
    } catch (error) {
        console.log(error);
    }
})

a.delete('/d/:id',async(req,res)=>{
    try {
        let id = req.params.id
        let re = await mm.findByIdAndDelete(id)
        if (re) {
            res.send("done");

        } else {
            console.log("sniff sniff ...");
        }
       
    } catch (error) {
        console.log(error);
    }
})

a.get('/s',async(req,res)=>{
    try {
        let re = await mm.find({})
        res.send(re)
    } catch (error) {
        console.log(error);
    }
})

a.listen(3000,()=>{
    console.log("running...");
})