// create the schema and convert it to a model
import mongoose from "mongoose";

import { Schema } from "mongoose";

// defining the schema 
const Hello = new Schema({
    title:{
        type:String
    },
    description : {
        type:String
    } ,
    date : {
        type : Date,
        default:Date.now
    }
})

// converting the schema to a working model 
const Model = mongoose.model('Model',Hello) ;

// exporting the model
export default Model ; 