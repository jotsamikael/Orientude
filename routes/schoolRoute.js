const User = require('../models/user');
const School = require('../models/school')
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const school = require('../models/school');

 require('dotenv').config();

module.exports = (router) =>{
   /********
    * 
    * GET  SCHOOLS ROUTE
    * 
    */

    router.get('/getAllSchools',(req, res)=>{
        School.find({}, (err, school)=>{
            if(err){
                res.json({success: false, message: "Something went wrong"})
            } else
            if(!school){
                res.json({success: false, message: 'No school was found'})

            } else{
                res.json({success: true, school: school})

            }
        })
    })

    return router;

}