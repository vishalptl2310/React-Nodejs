const mongoose = require('mongoose')

const mongooseURL = ""//Connect your mongodb server
mongoose.set("strictQuery", false);

const connnectToMongo = async ()=> {

        await mongoose.connect(mongooseURL) 
        .then(() =>{
            console.log("connected to server ")
        })
        .catch((err)=>{ console.log("database error occured")})
    }

module.exports = connnectToMongo;