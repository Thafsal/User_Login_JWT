const mongoose = require('mongoose')

const connectDB = (url)=>{
    return mongoose.connect(url,{
        useUnifiedTopology : true
    }).then(()=>{
        console.log(`connected to Db.....`)
    }).catch((err)=>{
        console.log(`ooops something wrong with the connection with the database${err}`)
    })
}

module.exports = connectDB;