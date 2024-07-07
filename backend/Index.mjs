import express from 'express'

import cors from 'cors'

import blogrouter from './route/blog-route.mjs';

//connecting to the database
import mongoos from './mongoose/mongoose.mjs';
// import mongoose from 'mongoose';





const app = express(); 

const PORT = process.env.PORT || 3000 ; 

app.use(express.json())

app.use(cors())

app.get('/',(req,res)=>{
    res.send('Hello World From the world of express')
});

app.use('/trials',blogrouter)


app.listen(PORT,()=>{
    console.log(`The server is running on port ${PORT}`);
})