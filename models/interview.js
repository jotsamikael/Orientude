const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


/*************** body validators ***********/

let bodyLengthChecker = (body)=>{
    if(!body){
        return false;
    }
    else {
        if(body.length < 20 || body.length> 1000){
            return false;
        } else {
          return true;
        }
    } 
}


const bodyValidators = [
   {
       validator: bodyLengthChecker,
        message: 'body must be more than 20 character but less than 1000'
   } ,

]




/*************** comment validators ***********/

let commentLengthChecker = (comment)=>{
    if(!comment[0]){  //we pass the first element of the array which is the string comment, since the second element is th commentator
        return false;
    }
    else {
        if(body.comment[0] < 1 || body.comment[0]> 250){
            return false;
        } else {
          return true;
        }
    } 
}


const commentValidators = [
   {
       validator: commentLengthChecker,
        message: 'comment must be more than 0 character but less than 250'
   } ,

]





/*************** title validators ***********/

let titleLengthChecker = (title)=>{
    if(!title){
        return false;
    }
    else {
        if(title.length < 3 || title.length> 60){
            return false;
        } else {
          return true;
        }
    } 
}
//title structure checker with regEx
 let titleStructureChecker = (title) =>{
     if(!title){
         return false
     } else{
         const regEx = new RegExp(/^[a-zA-Z0-9 ]+$/)
           return regEx.test(title) //returns either true or false
     }
 }



const titleValidators = [
   {
       validator: titleLengthChecker,
        message: 'title must be more than 5 character but less than 30'
   } ,
   {
    validator: titleStructureChecker,
     message: 'title must be alphanumeric'
} 
]


const Schema = mongoose.Schema;
const interviewSchema = new Schema({
   title: { type: String, required: true, validator: titleValidators},
   body: { type: String, required: true, validator: bodyValidators},
   createdBy: { type: String},
   createdAt: { type: Date, default: Date.now()},
   likes:{ type: Number, default:0},
   likedBy:{ type: Array},
   disLikes:{ type: Number, default:0},
   DisLikedBy:{ type: Array},
   comments:[
       {
           comment: { type: String, validator:commentValidators},
           commentator: { type: String}

       }
   ]
    
    
    

    
});







module.exports = mongoose.model('Interview',interviewSchema)