import mongoose  from "mongoose";

import Model from "../model/model.mjs";

//FUNTIONS OF THE CONTROLLER

// Fetch list of blogs
// will work withe the GET HTTP method
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