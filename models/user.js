const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt-nodejs') 

/*************** Password validators ***********/
let passwordLengthChecker = (password) =>{
    if(!password){
        return false;
    }
    else{
        if(password.length<6 || password.length> 30){
            return false;
        } else return true;
    }
}


let passwordStructureChecker = (password) =>{
    if(!password){
        return false;
    }
    else{
       const regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*?[\d])(?=.*?[\W]).{6,15}$/);
       return regex.test(password);
    }
}

let passwordValidator = [
    {
        validator: passwordLengthChecker,
        message: 'password should contain between 6 and 15 characters'
    },
    {
        validator: passwordStructureChecker,
        message: 'password should contain atleast one lowercase, one uppercase, one number and one special character',
    }
]




/*************** Username validators ***********/
let usernameStructureChecker = (username) =>{
    if(!username){
        return false
    } else{
        const regEx = new RegExp(/^[a-z0-9_.]+$/);
            return  regEx.test(username)
    }
};



let usernameLengthChecker = (username) =>{
    if(!username){
        return false
    } else{
        if(username.length < 4 || username.length> 30){
            return false;
        } else 
        {return true;}
       
    }
};

const usernameValidators = [
    {
        validator: usernameStructureChecker,
        message: 'username should not conatain spaces or special characters',
    },
    {
        validator:usernameLengthChecker,
        message: 'username should be greater than 4 characters and should be less than 15'

    }

]


/*************** Email validators ***********/

let emailLengthChecker = (email)=>{
    if(!email){
        return false;
    }
    else {
        if(email.length < 6 || email.length> 30){
            return false;
        } else {
          return true;
        }
    } 
}
//email structure checker with regEx
 let emailStructureChecker = (email) =>{
     if(!email){
         return false
     } else{
         const regEx = new RegExp(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i)
           return regEx.test(email) //returns either true or false
     }
 }

 //check wether role is 
 let roleTypeChecker = (role)=>{
     if(!role){
         return false;
     } else {
         if (role=== 'student' || role==='recruter' || role=== 'admin'){
             return true;
         } else{
             return false;
         }
     }
 }



const emailValidators = [
   {
       validator: emailLengthChecker,
        message: 'Email must be more than 5 character but less than 30'
   } ,
   {
    validator: emailStructureChecker,
     message: 'Email is not valid'
} 

]

const roleValidator = [
    {
        validator: roleTypeChecker,
        message: 'Role is either admin, student or recruter'
    }
]


const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
    role: {type: String, required: true, validate: roleValidator},
    username: {type: String, required: true, unique: true, lowercase: true, validate: usernameValidators},
    password: {type: String, required: true, validate: passwordValidator}
    
});


//hash password with bcrypt
userSchema.pre('save', function(next) {
    if(!this.isModified('password'))
    return next();

    bcrypt.hash(this.password, null, null, (err, hash) =>{
        if(err) return next(err);
        this.password = hash;
        next();
    })
})


//compare the encrpted password in db with the password the current user uses to login, return true if there's a match 
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User',userSchema)