const mongoose = require('mongoose')

const mongooseURL = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000"
mongoose.set("strictQuery", false);

const connnectToMongo = async ()=> {

        await mongoose.connect(mongooseURL) 
        .then(() =>{
            console.log("connected to server ")
        })
        .catch((err)=>{ console.log("database error occured")})
    }

module.exports = connnectToMongo;