const mongoose = require('mongoose');
let date = new Date();
date.setHours( date.getHours()+2);
console.log( date );

const articles = mongoose.model('articles',{
    title:{
        type: String,
        required: true,
        unique: true,

    },
    description:{
        type: String,
        required: true
    },
    auther:{
        type: String,
        required: true,
    },
    date:{
        type:String,
        default: date
    }
})

module.exports = articles;