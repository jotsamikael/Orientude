const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Notice = require('../models/notice');

 require('dotenv').config();

module.exports = (router) =>{

 /********
    * 
    * NEW INTERVIEW ROUTE
    * 
    */
   router.post('/newNotice', (req, res)=>{
    if(!req.body.title){

       res.json({ success: false, message: 'Notice title is required'})
    } else {

        if(!req.body.type){

         res.json({ success: false, message: 'Notice type is required'})
        }  else{

            if(!req.body.category){

                res.json({ success: false, message: 'Notice category is required'})
  
            } else {

                if(!req.body.description){
                    res.json({ success: false, message: 'Notice description is required'})
 
                }  else{
                    const  notice = new Notice({
                        title: req.body.title,
                        type: req.body.type,
                        category: req.body.category,
                        description: req.body.description,
                        createdBy: req.body.createdBy,
                        
                    })
                    notice.save((err)=>{
                        if(err){
                           if(err.errors){
                            if(err.errors.title) 
                            res.json({ success: false, message: err.errors.title.message}) 
 
                            else{
                               if(err.errors.type)
                               res.json({success: false, message: err.errors.type.message})

                               else{
                                   if(err.errors.category)
                                   res.json({success: false, message: err.errors.category.message})
                                   else {
                                       if(err.errors.description)
                                       res.json({success: false, message: err.errors.description.message})
                                       else
                                       res.json({success: false, message: err.errmsg})

                                   }
                               }
 
                           }

                        } 
                    }
                        
                        
                        else {
                            res.json({ message: 'notice saved successfully'})

                        }
                    })

                }        
                
            }
        }
        
    } 
});



   /********
    * 
    * GET  Notice ROUTE
    * 
    */

    router.get('/getAllNotice',(req, res)=>{
        Notice.find({}, (err, notice)=>{
            if(err){
                res.json({success: false, message: "Something went wrong"})
            } else
            if(!notice){
                res.json({success: false, message: 'No notice was found'})

            } else{
                res.json({success: true, notice: notice})

            }
        })
    })

    return router;

}