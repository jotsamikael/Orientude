const User = require('../models/user');
const Interview = require('../models/interview')
const jwt = require('jsonwebtoken');
const config = require('../config/database');

 require('dotenv').config();

module.exports = (router) =>{
   /********
    * 
    * NEW INTERVIEW ROUTE
    * 
    */
   router.post('/newInterview', (req, res)=>{
       if(!req.body.title){
          res.json({ success: false, message: 'Interview title is required'})
       } else {
           if(!req.body.body){
            res.json({ success: false, message: 'Your inetrview has no body'})
           }  else{
                   const  interview = new Interview({
                       title: req.body.title,
                       body: req.body.body,
                       createdBy: req.body.createdBy
                   })
                   interview.save((err)=>{
                       if(err){

                                if(err.errors){
                                    if(err.errors.title){ res.json({ success: false, message: err.errors.title.message})}
                                    else{
                                        if(err.errors.body){
                                            res.json({success: false, message: err.errors.body.message})
                                        }
                                        else
                                        res.json({success: false, message: err.errmsg})
                                    }
                                
                                }


                              res.json({success: false, message: err})
                       }
                       else{
                           res.json({success: true, message: 'Interview successfully saved'});
                       }

                   })
               }
           
       } 
   });

   router.get('/getInterviews', (req,res)=>{
       Interview.find({}, (err, interview)=>{

           if(err){
                res.json({success: false, message: err})
           } else {
               if(!interview){

                 res.json({success: false, message: 'No interviews found'})

               } else{
                    res.json({success: true, interview: interview})
               }
           }
       }).sort({'_id':-1})
   })




   return router; //return router to main index.js
}