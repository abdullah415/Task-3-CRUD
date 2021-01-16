const express = require('express');
const router= new express.Router();
const Articles = require('../models/articles'); 


router.get('/articles',(req,res)=>{
    Articles.find({}).then((articles)=>{
        res.status(200).send(articles);
    }).catch((e)=>{
        res.status(500).send('connection error');
    })
})

router.post('/articles',(req,res)=>{
    const articles = new Articles(req.body);
    articles.save().then(()=>{
        res.status(200).send(articles);
    }).catch((e)=>{
        res.status(400).send('unable to find this article');
    })
})

router.get('/articles/:id',(req,res)=>{
    const _id = req.params.id
    Articles.findById(_id).then((articles)=>{
        if(!articles){
            return res.status(400).send('unable to find this article')
        }
        res.status(200).send(articles);
    }).catch((e)=>{
        res.status(500).send('connection error');
    })

})

router.patch('/articles/:id', async(req,res)=>{
    const updates = Object.keys(req.body);

    const allawedupdates = ['title','description'];

    var isValid = updates.every((update)=> allawedupdates.includes(update));
    if(!isValid){
       return res.status(400).send('cant not update');
    }
    const _id=req.params.id
    try{

        const articles = await Articles.findByIdAndUpdate(_id,req.body,{
            new:true,
            runValidators:true
        });
        if(!articles){
            return res.send('unable to find articles');
        }
        res.status(200).send(articles);
        
    }catch{
        res.status(400).send('unable to find this article');
    };

});

router.delete('/articles/:id',(req,res)=>{
    const _id = req.params.id
    Articles.findByIdAndDelete(_id).then((articles)=>{
        if(!articles){
            return res.status(400).send('unable to delete this article');
        }
        res.status(200).send(articles);
    }).catch((e)=>{
        res.status(500).send('connection error');
    })

})

module.exports = router