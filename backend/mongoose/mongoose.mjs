import mongoose from "mongoose";

//connecting to mongoDB

const mongoos =  mongoose.connect('mongodb://localhost:27017/trials2').then(()=>{
    console.log("connected to mongo database")
}).catch((err)=>{
    console.log(err)
})

export default mongoos ; 