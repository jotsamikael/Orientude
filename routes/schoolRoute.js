const User = require('../models/user');
const School = require('../models/school')
const jwt = require('jsonwebtoken');
const config = require('../config/database');

 require('dotenv').config();

module.exports = (router) =>{
   /********
    * 
    * NEW SCHOOL ROUTE
    * 
    */

    router.post('/newSchool',(req,res)=>{
        res.send('school is ok')
    })

    return router;

}