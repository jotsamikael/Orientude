const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Application = require('../models/application');


 require('dotenv').config();

module.exports = (router) =>{
   /********
    * 
    * REGISTER ROUTE
    * 
    */
router.post('/newApplication', (req, res)=>{
    if(!req.body.name){
        res.json({success: false, message: "name is required"})
    } else{
        if(!req.body.surname){
            res.json({success: false, message: "surname is required"})

        } else {
            if(!req.body.phone){
                res.json({success: false, message: "A phone number is required"})
  
            } else {
                if(!req.body.cvFile){
                    res.json({success: false, message: "A cv file  is required"})

                } else{
                    const application = new Application({
                        name: req.body.name,
                        surname: req.body.surname,
                        phone: req.body.phone,
                        cvFile: req.body.cvFile,
                        createdBy: req.body.createdBy,
                        noticeId: req.body.noticeId
                    })

                    application.save( (err)=>{
                        if(err){
                            if(err.errors){
                                if(err.errors.name) res.json({success: false, message: err.errors.name.message})
                                else{
                                    if(err.errors.surname) res.json({success: false, message: err.errors.surname.message})
                                    else {
                                        if(err.errors.phone) res.json({success: false, message: err.errors.phone.message})
                                         else{
                                            if(err.errors.cvFile) res.json({success: false, message: err.errors.cvFile.message})
                                            else
                                            res.json({success: false, message: err.errmsg})
                                         } 
                                    }

                                } 
                            }

                        }

                        else{
                            res.json({success: true, message: 'Application successfully saved'});
                        }
                        
                    })
                }
            }
        }
    }

})
    
  


/***************
 ***************
   GET ALL APPLICATIONS ROUTE
 
   *************/
  router.get('/getApplications', (req, res)=>{
    Application.find({}, (err, application)=>{

        if(err){
             res.json({success: false, message: err})
        } else {
            if(!application){

              res.json({success: false, message: 'No application found'})

            } else{
                 res.json({success: true, application: application})
            }
        }
    }).sort({'_id':-1})
})


return router; //return router to main index.js
}