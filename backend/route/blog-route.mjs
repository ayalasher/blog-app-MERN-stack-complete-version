//the routes from the backend
//When the routes are called from the backend other items are going to be executed

// Importing express without using the renaming it to app()
import express from 'express'

import {fetchblogslist } from '../controller/blog-controller.mjs'
// const fetchblogslist = require('../controller/blog-controller.mjs')


import { addnewblog} from '../controller/blog-controller.mjs'

// const addnewblog = require('../controller/blog-controller.mjs')

import {deleteblog} from '../controller/blog-controller.mjs'
// const deleteblog = require('../controller/blog-controller.mjs')

import { updateblog} from '../controller/blog-controller.mjs'
// const updateblog = require('../controller/blog-controller.mjs')
// const app = express() ;

const blogrouter = express.Router() ;


// creating routes and the variable functions together with HTTP methods
blogrouter.get('/',fetchblogslist)
blogrouter.post('/add',addnewblog) ; 
blogrouter.delete('/delete/:id',deleteblog)
blogrouter.put('/update/:id',updateblog) ;

export default blogrouter; 