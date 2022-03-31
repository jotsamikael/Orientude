const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

 require('dotenv').config();

module.exports = (router) =>{
   /********
    * 
    * REGISTER ROUTE
    * 
    */
router.post('/register', (req, res)=>{
    //req.body.email
    //req.body.username
    //req.body.password
   if(!req.body.email){
       res.json({success: false, message: 'You must provide an email'})
   } 

   else{

    if(!req.body.username){
        res.json({success: false, message: 'You must provide a username'})
    }  

    else{
        if(!req.body.password){
            res.json({success: false, message: 'You must provide a password'})
        } 
   
    else{
        let user = new User({
            email : req.body.email.toLowerCase(),
            username : req.body.username.toLowerCase(),
            password : req.body.password
    
        })
        user.save((err) =>{
            if(err){
                if(err.code === 11000){
                    res.json({success: false, message: 'Username or email already exists'})
  
                } 
                else{
                    if(err.errors){
                        if(err.errors.email){
                            res.json({success: false, message: err.errors.email.message})
      
                           }
                       else{
                        if(err.errors.username){
                        res.json({success: false, message: err.errors.username.message})
                        } else {
                            if(err.errors.password){
                            res.json({success: false, message: err.errors.password.message})
                            }
                            else {
                                res.json({success: false, message: 'Error occured' +err})
                            }
                        }
                    } 
                  }
                }
             } 
            else{
                res.json({success: true, message: 'Account registered succesfully'})
    
            }
        });
    }
   }
   }

   
})

//check email uniqueness in real time on client

router.get('/checkEmail/:', (req, res)=>{

    if(!req.params.email){

        res.json({success:false,message: 'Email must be provided'})

    } else{

        User.findOne({email: req.params.email}, (err, user)=>{

          if(err){
              res.json({success:false, message: err});
          } else{

               if(user){
                res.json({success:false, message: 'This email is used by another account'});
               }
                else{
                res.json({success:true, message: 'This email is available'});

               }
          }
        })
    }
});






//check email uniqueness in real time on client

router.get('/checkUsername/:username', (req, res)=>{

    if(!req.params.username){

        res.json({success:false, message: 'username is req'});

    } else{

        User.findOne({username: req.params.username}, (err, user)=>{

          if(err){
              res.json({success:false, message: err});
          } else{

               if(user){
                res.json({success:false, message: 'This username is used by another account'});
               }
                else{
                res.json({success:true, message: 'This username is available'});

               }
          }
        })
    }
})

/********
    * 
    * LOGIN ROUTE
    * 
    */
 router.post('/login', (req, res)=>{

    if(!req.body.username){

         res.json({success: false, message: 'No username entered'})

     } else{

         if(!req.body.password){

             res.json({success:false, message: 'No password entered'})

         } else {

             User.findOne({username: req.body.username.toLowerCase()}, (err, user)=>{

                 if(err){

                     res.json({success: false, message: err})

                 } else{

                     if(!user){

                         res.json({success: false, message: 'user ' +req.body.username +' does not exist'})
                     } else{

                         const validPassword = user.comparePassword(req.body.password);

                         if(!validPassword){

                             res.json({success: false, message: 'Entered password does not match password of user: '+req.body.username})

                         } else{

                            //creation of jsonwebtoken
                          const token =   jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'})

                             res.json({success: true, message: 'successful login', token: token, user: {username: user.username}})

                         }

                     }
                 }
             })
         }
     }
 })

 //All routes that require authorization should be place after this
 router.use((req,res,next)=>{

    const token = req.headers['authorization'].replace(/^Bearer\s/, '');
   
    console.log('token is'+token);

      if(!token){

          res.json({success:false, message: 'No token provided'});

      } else{

          console.log('secret ix :' + process.env.ACCESS_TOKEN_SECRET);

          jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {   // decodes the token using config.secret and store it in 'decoded'
              
          if(err){

              res.json({success: false, message: 'Invalid token:' +err});

          } else{

              req.decoded = decoded;
              next();
          }
          }) 
      }
 })

 router.get('/profile', (req,res)=>{
    User.findOne({_id: req.decoded.userId}).select('username email').exec((err, user)=>{
         if(err){
             res.json({success: false, message: err})
         } else{
             if(!user){
                 res.json({success: false, message: 'No user found'});
             } else{
                 res.json({sucess: true, user:user});
             }
         }
    })
 })


    return router; //return router to main index.js
}