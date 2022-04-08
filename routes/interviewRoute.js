const User = require('../models/user');
const Interview = require('../models/interview')
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const interview = require('../models/interview');
//const interview = require('../models/interview');

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

/***************
 ***************
   GET ALL INTERVIEWS ROUTE
 
   *************/
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




/********
 *  GET SINGLE INTERVIEW ROUTE
 ********************/
   router.get('/singleInterview/:id', (req, res)=>{
       if(!req.params.id){
        res.json({success: false, message: 'No blog with id: '+req.params.id +', foundx'})

       } else{
        Interview.findOne({_id: req.params.id}, (err, interview)=>{

          if(err){

              res.json({success: false, message: 'No blog with id: '+req.params.id +' found'});
          } 
          else{

              if(!interview){

                  res.json({success: false, message: 'No interview found'});
              }
              User.findOne({_id: req.decoded.userId}, (err, user)=>{
                if(err){
                    res.json({success: false, message: err})

                } else{
                    if(!user){
                        res.json({success: false, message: "could not authenticate user"})

                    } 
                    else{
                        if(user.username !== interview.createdBy){
                            res.json({success: false, message: "you are not authorized to edited this interview"})

                        } else 
                        {            
                              res.json({success: true,  interview: interview})
                        }
                    }
                }

            })

              
          }
      })
    } 
   })

   router.get('/singleInterview/', (req, res)=>{
    res.json({success: false,  message: 'Cannot get any interview without id'})
   })




   /********
 *  UPDATE INTERVIEW ROUTE
 ********************/

 router.put('/updateInterview', (req, res)=>{

     if(!req.body._id){

        res.json({success: false, message: 'no id provided'})
     } 
     else{
       Interview.findOne({_id: req.body._id} , (err, interview)=>{
           if(err){
            res.json({success: false, message: 'id does not belong to any interview'})

           } else{
                if(!interview){
                    res.json({success: false, message: "no interview with these id found"})

                } else{

                     User.findOne({_id: req.decoded.userId}, (err, user)=>{
                        if(err){
                            res.json({success: false, message: err})
   
                        } else{
                            if(!user){
                                res.json({success: false, message: "could not authenticate user"})

                            } 
                            else{
                                if(user.username !== interview.createdBy){
                                    res.json({success: false, message: "you are not authorized to edit this interview"})

                                } else {
                                   interview.title = req.body.title;
                                   interview.body = req.body.body;
                                   interview.save( (err) =>{
                                       if(err){
                                        res.json({success: false, message: err})

                                       } else{
                                        res.json({success: false, message: "interview updated succesfully"})

                                       }
                                   })

                                }
                            }
                        }

                    })
                } 
           }
       })
     }
 })


 /********
 *  DELETE INTERVIEW ROUTE
 ********************/

 router.delete('deleteInterview:id',(req, res)=>{
    if(!req.params.id){
         res.json({success: false, message: 'no id provided'})
    } else{
        Interview.findOne({_id:req.params.id}, (err, interview)=>{
            if(err){
                res.json({success:false, message: err});

            } else {

           if(!interview){
            res.json({success: false, message: "no interview with these id found"})

        } else{

            User.findOne({_id: req.decoded.userId}, (err, user)=>{
                if(err){
                    res.json({success: false, message: err})

                } else{
                    if(!user){
                        res.json({success: false, message: "could not authenticate user"})

                    } 
                    else{
                        if(user.username !== interview.createdBy){
                            res.json({success: false, message: "you are not authorized to edit this interview"})

                        } else {
                            interview.remove((err)=>{
                                if(err){
                                    res.json({success: false, message: err})
                                } else{
                                    res.json({success: true, message: "interview deleted"})

                                }
                            })

                        }
                    }
                }

            })
            
           
        }
     }
  })

    }
 })




   return router; //return router to main index.js
}