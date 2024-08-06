import mongoose  from "mongoose";

import Model from "../model/model.mjs";

//FUNTIONS OF THE CONTROLLER

// Fetch list of blogs
// will work with the the GET HTTP method
// fetching a list of items
//create a variable which is an asyn funtion with request and response
//create a variable that will represent the array of info to be gotten
//apply try catch
// The variable that was created will be equated to the importedmodel .find() and the await funtion
// catch will console.log the error
// if is done to check if there is no bloglist and displays a message in that case
// if there is a bloglist then it will be sent under.json({}) --The curly braces are for the array


const fetchblogslist = async(req,res)=>{
    let Blogist ; 

    try {
        Blogist = await Model.find()
    } catch (err) {
        console.log(err);
    }
    if (!Blogist) {
        return res.status(404).json({message:"No blogs found !! "})
    }
    return res.status(200).json({Blogist})
}


//create or add a new blog 
// Will work with the POST method 
//create a variable which is an asyn funtion with request and response
// create the variables to represent fields
// Tie the fields to the req.body if provided by the use
// date is done with the new Date()
// Figure out how you do it with the Types.objetcID

// create a variable to hold the fields of the collections


// apply try catch to save the data
// try is an await , the variable containing the fields and .save()

const addnewblog = async(req,res)=>{
    const {title , description } = req.body ; 
    const currentdate = new Date() ; 

    const newlycraetedblog = new Model({
        title , description , date : currentdate
    })

    try {
        await newlycraetedblog.save()
    } catch (error) {
        console.log(error);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newlycraetedblog.save(session);
         session.commitTransaction();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error});
    }

    res.status(200).json({newlycraetedblog})
}

// delete a blog
// will work with the DELETE method

const deleteblog = async(req,res)=>{
    const id = req.params.id ; 
    try {
        const findcurrentblog = await Model.findByIdAndDelete(id);
        if (!findcurrentblog) {
            return res.status(404).json({message:"blog not found"})
        }
        return res.status(200).json({message:"Deleted !! " })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Unable to delete"})
    }
}


// update a blog
//will work with the PUT and PATCH methods
const updateblog = async(req,res)=>{
    const id = req.params.id ;

    const {title , description} = req.body ; 

    let blogtoupdate ;
    try {
        blogtoupdate = await Model.findByIdAndUpdate(id,{
            title , description
        }) ; 
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Updating error ! "})
    }

    if (!blogtoupdate) {
        return res.status(500).json({message:"Unable to complete update process"})
    }

    return res.status(200).json({blogtoupdate}) ; 
}

// correct way to export many variables
// The other method was wrong because many statements are going to overwrite each other
export { fetchblogslist, addnewblog, deleteblog, updateblog };